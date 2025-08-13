import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from 'rxjs';
import { EventService } from "@repositories/event/event";
import { ApplicationService } from "@repositories/application/application";
import { Event } from "@entities/event.entity";
import { Application } from "@entities/application.entity";
import { EVENT_DESCRIPTION_SUCCESS, EVENT_DESCRIPTION_FAILED, EVENT_STATUS } from '@helpers/enums/event.enum';
import { APPLICATION_NAME } from "@helpers/enums/application.enum";
import * as crypto from 'crypto';

@Injectable()
export class S3Service {
    accessKey: string;
    secretKey: string;
    bucket: string;
    accountId = '123456789012';
    outpostId = 'op-01ac5d28a6a232904';
    region = 'us-east-2';
    service = 's3-outposts';

    constructor(
        private http: HttpService,
        private readonly configService: ConfigService,
        private readonly eventService: EventService,
        private readonly applicationService: ApplicationService
    ) {
        this.accessKey = this.configService.get<string>("S3_KEY") || ""
        this.secretKey = this.configService.get<string>("S3_SECRET") || ""
        this.bucket = this.configService.get<string>("S3_BUCKET") || ""
    }

    private sha256(message: string) {
        return crypto.createHash('sha256').update(message).digest('hex');
    }

    private hmac(key: any, message: string) {
        return crypto.createHmac('sha256', key).update(message).digest();
    }

    private getSignatureKey(key: string, dateStamp: string, regionName: string, serviceName: string) {
        const kDate = this.hmac('AWS4' + key, dateStamp);
        const kRegion = this.hmac(kDate, regionName);
        const kService = this.hmac(kRegion, serviceName);
        return this.hmac(kService, 'aws4_request');
    }

    async fetchApplication() {
        return await this.applicationService.findByName(APPLICATION_NAME.S3)
    }

   async onExecute() {
    const host = `${this.service}.${this.region}.amazonaws.com`;
    const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substring(0, 8);

    const canonicalUri = `/v20180820/bucket/${this.bucket}`;
    const canonicalQuerystring = '';
    const canonicalHeaders =
        `host:${host}\n` +
        `x-amz-account-id:${this.accountId}\n` +
        `x-amz-date:${amzDate}\n` +
        `x-amz-outpost-id:${this.outpostId}\n`;
    const signedHeaders = 'host;x-amz-account-id;x-amz-date;x-amz-outpost-id';
    const payloadHash = this.sha256('');

    const canonicalRequest = [
        'HEAD',
        canonicalUri,
        canonicalQuerystring,
        canonicalHeaders,
        signedHeaders,
        payloadHash
    ].join('\n');

    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/${this.region}/${this.service}/aws4_request`;
    const stringToSign = [
        algorithm,
        amzDate,
        credentialScope,
        this.sha256(canonicalRequest)
    ].join('\n');

    const signingKey = this.getSignatureKey(this.secretKey, dateStamp, this.region, this.service);
    const signature = crypto.createHmac('sha256', signingKey)
        .update(stringToSign)
        .digest('hex');

    const authorizationHeader = `${algorithm} Credential=${this.accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const url = `https://${host}${canonicalUri}`;

    const response = await firstValueFrom(
        this.http.head(url, {
        headers: {
            'host': host,
            'x-amz-account-id': this.accountId,
            'x-amz-date': amzDate,
            'x-amz-outpost-id': this.outpostId,
            'Authorization': authorizationHeader
        },
        validateStatus: () => true
        })
    );
    const application = await this.fetchApplication();

    let event: Partial<Event> = {
        application: { id: application?.id } as Application,
        created_at: new Date()
    };

    if (response.status === 200) {
        event = {
            ...event,
            description: EVENT_DESCRIPTION_SUCCESS.S3,
            status: EVENT_STATUS.success
        }
    }else {
        event = {
            ...event,
            description: EVENT_DESCRIPTION_FAILED.S3,
            status: EVENT_STATUS.failed
        }
    }
    this.eventService.save(event)
    }
}
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventService } from "@repositories/event/event";
import { ApplicationService } from "@repositories/application/application";
import { Event } from "@entities/event.entity";
import { Application } from "@entities/application.entity";
import { EVENT_DESCRIPTION_SUCCESS, EVENT_DESCRIPTION_FAILED, EVENT_STATUS } from '@helpers/enums/event.enum';
import { APPLICATION_NAME } from "@helpers/enums/application.enum";
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3'

@Injectable()
export class S3Service {
    private s3: S3Client

    constructor(
        private http: HttpService,
        private readonly configService: ConfigService,
        private readonly eventService: EventService,
        private readonly applicationService: ApplicationService
    ) {
        this.s3 = new S3Client({
            region: this.configService.get<string>("S3_REGION") || "",
            credentials: {
                accessKeyId: this.configService.get<string>("S3_KEY") || "",
                secretAccessKey: this.configService.get<string>("S3_SECRET") || ""
            }
        })
    }

    async onExecute() {
        const command = new ListBucketsCommand({});
        const application = await this.fetchApplication();
        let event: Partial<Event> = {
            application: { id: application?.id } as Application,
            created_at: new Date()
        };
        try {
            await this.s3.send(command);
             event = {
                ...event,
                description: EVENT_DESCRIPTION_SUCCESS.S3,
                status: EVENT_STATUS.success
            }
        } catch (error) {
            event = {
                ...event,
                description: EVENT_DESCRIPTION_FAILED.S3,
                status: EVENT_STATUS.failed
            }
        }
        this.eventService.save(event)
    }

    async fetchApplication() {
        return await this.applicationService.findByName(APPLICATION_NAME.OPENAI)
    }
}
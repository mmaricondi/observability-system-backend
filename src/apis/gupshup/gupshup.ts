import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from 'rxjs';
import { EventService } from "@repositories/event/event";
import { ApplicationService } from "@repositories/application/application";
import * as qs from 'qs';
import { Event } from "@entities/event.entity";
import { Application } from "@entities/application.entity";
import { EVENT_DESCRIPTION_SUCCESS, EVENT_DESCRIPTION_FAILED, EVENT_STATUS } from '@helpers/enums/event.enum';
import { APPLICATION_NAME } from "@helpers/enums/application.enum";

@Injectable()
export class GupshupService {
    baseUrl: string;
    key: string;
    sourcePhone: string;
    destinationPhone: string;
    appName: string;
    templateId: string;
    templateParams: string[];
    channel: string;

    constructor(
        private http: HttpService,
        private readonly configService: ConfigService,
        private readonly eventService: EventService,
        private readonly applicationService: ApplicationService
    ) {
        this.baseUrl = this.configService.get<string>("GUPSHUP_BASEURL") || ""
        this.key = this.configService.get<string>("GUPSHUP_KEY") || ""
        this.sourcePhone = "5521993686082"
        this.destinationPhone = "5521993686082"
        this.appName = "clickguru";
        this.templateId = "1";
        this.templateParams = ["1"];
        this.channel = 'whatsapp';
    }

    async onExecute() {
        try {
            const data = {
                channel: this.channel,
                source: this.sourcePhone,
                destination: this.destinationPhone,
                'src.name': this.appName,
                template: JSON.stringify({
                    id: this.templateId,
                    params: this.templateParams,
                })
            };
            const dataEncoded = qs.stringify(data, { allowDots: true });
            const response = await firstValueFrom(
                this.http.post(`${this.baseUrl}`, dataEncoded, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        apikey: this.key
                    }
                })
            )
            const application = await this.fetchApplication();
            let event: Partial<Event> = {
                application: { id: application?.id } as Application,
                created_at: new Date()
            };
    
            if(response?.data?.data) {
                event = {
                    ...event,
                    description: EVENT_DESCRIPTION_SUCCESS.GUPSHUP,
                    status: EVENT_STATUS.success
                }
            }else {
                event = {
                    ...event,
                    description: EVENT_DESCRIPTION_FAILED.GUPSHUP,
                    status: EVENT_STATUS.failed
                }
            }
            this.eventService.save(event)
        }catch (error) {
            console.error("Error fetching gupshup:", error)
        }
    }

    async fetchApplication() {
        return await this.applicationService.findByName(APPLICATION_NAME.GUPSHUP)
    }
}
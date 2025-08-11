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

@Injectable()
export class PagbankService {
    baseUrl: string;
    webhookUrl: string;
    asasKey: string;

    constructor(
        private http: HttpService,
        private readonly configService: ConfigService,
        private readonly eventService: EventService,
        private readonly applicationService: ApplicationService
    ) {
        this.baseUrl = this.configService.get<string>("ASAS_BASEURL") || ""
        this.webhookUrl = this.configService.get<string>("ASAS_WEBHOOK") || ""
        this.asasKey = this.configService.get<string>("ASAS_KEY") || ""
    }

    async onExecute() {
        const response = await firstValueFrom(
            this.http.get(`${this.baseUrl}${this.webhookUrl}`, {
                headers: {
                    access_token: this.asasKey
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
                description: EVENT_DESCRIPTION_SUCCESS.PAGBANK,
                status: EVENT_STATUS.success
            }
        }else {
            event = {
                ...event,
                description: EVENT_DESCRIPTION_FAILED.PAGBANK,
                status: EVENT_STATUS.failed
            }
        }
        this.eventService.save(event)
    }

    async fetchApplication() {
        return await this.applicationService.findByName(APPLICATION_NAME.PAGBANK)
    }
}
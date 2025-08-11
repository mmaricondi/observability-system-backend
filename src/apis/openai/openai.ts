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
export class OpenAiService {
    baseUrl: string;
    key: string;

    constructor(
        private http: HttpService,
        private readonly configService: ConfigService,
        private readonly eventService: EventService,
        private readonly applicationService: ApplicationService
    ) {
        this.baseUrl = this.configService.get<string>("OPENAI_BASEURL") || ""
        this.key = this.configService.get<string>("OPENAI_KEY") || ""
    }

    async onExecute() {
        try {
            const response = await firstValueFrom(
                this.http.get(this.baseUrl, {
                    headers: {
                        Authorization: `Bearer ${this.key}`
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
                    description: EVENT_DESCRIPTION_SUCCESS.OPENAI,
                    status: EVENT_STATUS.success
                }
            }else {
                event = {
                    ...event,
                    description: EVENT_DESCRIPTION_FAILED.OPENAI,
                    status: EVENT_STATUS.failed
                }
            }
            this.eventService.save(event)
        }catch (error) {
            console.error("Error fetching OpenAI models:", error)
        }
    }

    async fetchApplication() {
        return await this.applicationService.findByName(APPLICATION_NAME.OPENAI)
    }
}
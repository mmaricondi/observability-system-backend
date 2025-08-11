import { Injectable } from "@nestjs/common";
import { ApplicationService } from "@repositories/application/application";
import { APPLICATION_NAME, APPLICATION_TYPE } from "@helpers/enums/application.enum";

@Injectable()
export class Seed {
    constructor(
        private readonly applicationService: ApplicationService
    ) {}

    async run() {
        const applications = [
            { name: APPLICATION_NAME.ASAAS, type: APPLICATION_TYPE.EXTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.PAGBANK, type: APPLICATION_TYPE.EXTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.CHATGURU, type: APPLICATION_TYPE.EXTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.OPENAI, type: APPLICATION_TYPE.EXTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.S3, type: APPLICATION_TYPE.EXTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.GUPSHUP, type: APPLICATION_TYPE.EXTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.TRISTAR, type: APPLICATION_TYPE.EXTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.GOOGLE, type: APPLICATION_TYPE.EXTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.API_PROD, type: APPLICATION_TYPE.INTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.API_DEV, type: APPLICATION_TYPE.INTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.SOCKET, type: APPLICATION_TYPE.INTERNAL, updated_at: new Date() },
            { name: APPLICATION_NAME.MICROSSERVICES, type: APPLICATION_TYPE.INTERNAL, updated_at: new Date() }
        ];

        for (const appData of applications) {
            await this.applicationService.create(appData);
        }
    }
}


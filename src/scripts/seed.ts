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
            { name: APPLICATION_NAME.ASAAS, type: APPLICATION_TYPE.EXTERNAL, updated_at: new Date() }
        ];

        for (const appData of applications) {
            await this.applicationService.create(appData);
        }
    }
}


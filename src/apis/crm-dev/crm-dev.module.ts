import { Module } from "@nestjs/common";
import { CrmDevService } from "@src/apis/crm-dev/crm-dev";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [CrmDevService],
    exports: [CrmDevService]
})
export class CrmDevModule {}

import { Module } from "@nestjs/common";
import { CrmProdService } from "@src/apis/crm-prod/crm-prod";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [CrmProdService],
    exports: [CrmProdService]
})
export class CrmProdModule {}

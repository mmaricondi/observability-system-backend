import { Module } from "@nestjs/common";
import { AsaasService } from "@src/apis/asaas/asaas";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [AsaasService],
    exports: [AsaasService]
})
export class AsaasModule {}

import { Module } from "@nestjs/common";
import { GupshupService } from "@apis/gupshup/gupshup";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [GupshupService],
    exports: [GupshupService]
})
export class GupshupModule {}

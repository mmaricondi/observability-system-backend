import { Module } from "@nestjs/common";
import { TristarService } from "@apis/tristar/tristar";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [TristarService],
    exports: [TristarService]
})
export class TristarModule {}

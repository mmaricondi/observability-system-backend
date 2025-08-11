import { Module } from "@nestjs/common";
import { OpenAiService } from "@src/apis/openai/openai";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [OpenAiService],
    exports: [OpenAiService]
})
export class OpenAiModule {}

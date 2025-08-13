import { Module } from "@nestjs/common";
import { ChatGuruService } from "@src/apis/chatguru/chatguru";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [ChatGuruService],
    exports: [ChatGuruService]
})
export class ChatGuruModule {}

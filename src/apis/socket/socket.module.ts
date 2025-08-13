import { Module } from "@nestjs/common";
import { SocketService } from "@apis/socket/socket";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [SocketService],
    exports: [SocketService]
})
export class SocketModule {}

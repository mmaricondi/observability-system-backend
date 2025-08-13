import { Module } from "@nestjs/common";
import { S3Service } from "@src/apis/s3/s3";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [S3Service],
    exports: [S3Service]
})
export class S3Module {}

import { Module } from "@nestjs/common";
import { PagbankService } from "@apis/pagbank/pagbank";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [PagbankService],
    exports: [PagbankService]
})
export class PagbankModule {}

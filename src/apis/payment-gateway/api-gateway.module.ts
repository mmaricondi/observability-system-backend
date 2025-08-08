import { Module } from "@nestjs/common";
import { ApiGatewayService } from "@apis/payment-gateway/api-gateway";
import { HttpModule } from "@nestjs/axios";
import { EventModule } from "@src/repositories/event/event.module";
import { ApplicationModule } from "@repositories/application/application.module";
@Module({
    imports: [HttpModule, EventModule, ApplicationModule],
    providers: [ApiGatewayService],
    exports: [ApiGatewayService]
})
export class ApiGatewayModule {}

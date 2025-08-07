import { Module } from "@nestjs/common";
import { ApiGatewayService } from "@apis/payment-gateway/api-gateway";
@Module({
    providers: [ApiGatewayService],
    exports: [ApiGatewayService]
})
export class ApiGatewayModule {}

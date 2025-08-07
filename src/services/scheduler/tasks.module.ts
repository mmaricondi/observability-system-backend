import { Module } from "@nestjs/common";
import { ApiGatewayModule } from "@apis/payment-gateway/api-gateway.module";

@Module({
    imports: [ ApiGatewayModule ]
})

export class TasksModule {}
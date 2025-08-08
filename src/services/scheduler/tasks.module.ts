import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ApiGatewayModule } from "@apis/payment-gateway/api-gateway.module";
import { TasksService } from "@services/scheduler/tasks";

@Module({
    imports: [ ApiGatewayModule ], 
    providers: [ TasksService ]
})

export class TasksModule {}
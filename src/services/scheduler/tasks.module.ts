import { Module } from "@nestjs/common";
import { AsaasModule } from "@src/apis/asaas/asaas.module";
import { TasksService } from "@services/scheduler/tasks";

@Module({
    imports: [ AsaasModule ], 
    providers: [ TasksService ]
})

export class TasksModule {}
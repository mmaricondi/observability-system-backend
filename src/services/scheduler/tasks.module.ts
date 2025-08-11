import { Module } from "@nestjs/common";
import { TasksService } from "@services/scheduler/tasks";
import { AsaasModule } from "@apis/asaas/asaas.module";
import { OpenAiModule } from "@apis/openai/openai.module";
import { GupshupModule } from "@apis/gupshup/gupshup.module";
import { TristarModule } from "@apis/tristar/tristar.module";

@Module({
    imports: [ AsaasModule, OpenAiModule, GupshupModule, TristarModule ], 
    providers: [ TasksService ]
})

export class TasksModule {}
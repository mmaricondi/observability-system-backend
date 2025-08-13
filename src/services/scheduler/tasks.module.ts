import { Module } from "@nestjs/common";
import { TasksService } from "@services/scheduler/tasks";
import { AsaasModule } from "@apis/asaas/asaas.module";
import { OpenAiModule } from "@apis/openai/openai.module";
import { GupshupModule } from "@apis/gupshup/gupshup.module";
import { TristarModule } from "@apis/tristar/tristar.module";
import { S3Module } from "@src/apis/s3/s3.module";
import { SocketModule } from "@apis/socket/socket.module";
import { CrmProdModule } from "@src/apis/crm-prod/crm-prod.module";
import { CrmDevModule } from "@src/apis/crm-dev/crm-dev.module";

@Module({
    imports: [ AsaasModule, OpenAiModule, GupshupModule, TristarModule, S3Module, SocketModule, CrmProdModule, CrmDevModule ], 
    providers: [ TasksService ]
})

export class TasksModule {}
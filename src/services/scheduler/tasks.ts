import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AsaasService } from '@apis/asaas/asaas';
import { OpenAiService } from '@apis/openai/openai';
import { GupshupService } from "@apis/gupshup/gupshup";
import { TristarService } from "@apis/tristar/tristar";

@Injectable()
export class TasksService {

  constructor(
    private readonly asaasService: AsaasService,
    private readonly openAiService: OpenAiService,
    private readonly gupshupService: GupshupService,
    private readonly tristarService: TristarService
  ){}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('Running scheduled tasks...');
    // this.asaasService.onExecute();
    // this.openAiService.onExecute();
    // this.tristarService.onExecute();
    // this.gupshupService.onExecute();
  }
}

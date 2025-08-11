import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AsaasService } from '@apis/asaas/asaas';

@Injectable()
export class TasksService {

  constructor(
    private readonly asaasService: AsaasService
  ){}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.asaasService.onExecute()
  }
}

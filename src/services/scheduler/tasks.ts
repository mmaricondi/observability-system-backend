import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiGatewayService } from '@apis/payment-gateway/api-gateway';

@Injectable()
export class TasksService {

  constructor(
    private readonly apiGatewayService: ApiGatewayService
  ){}

  @Cron(CronExpression.EVERY_10_MINUTES)
  handleCron() {
    this.apiGatewayService.onExecute()
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiGatewayService } from '@apis/payment-gateway/api-gateway';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly apiGatewayService: ApiGatewayService
  ){}

  @Cron('10 * * * * *')
  handleCron() {
      this.apiGatewayService.fetchWebhooks()
  }
}

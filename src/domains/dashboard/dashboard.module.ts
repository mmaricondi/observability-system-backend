import { Module } from '@nestjs/common';
import { DashboardService } from '@domains/dashboard/dashboard';
import { DashboardController } from '@domains/dashboard/dashboard.controller';
@Module({
    controllers: [DashboardController],
    providers: [DashboardService],
})

export class DashboardModule {}

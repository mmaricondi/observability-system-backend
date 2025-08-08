import { Module } from '@nestjs/common';
import { DashboardService } from '@domains/dashboard/dashboard';
import { DashboardController } from '@domains/dashboard/dashboard.controller';
import { ApplicationModule } from '@src/repositories/application/application.module';
@Module({
    imports: [ApplicationModule],
    controllers: [DashboardController],
    providers: [DashboardService],
})

export class DashboardModule {}

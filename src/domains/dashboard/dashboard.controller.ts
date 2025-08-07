import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@domains/auth/auth.guard';
import { DashboardService } from '@domains/dashboard/dashboard';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('all')
    all(@Request() req: any) {
        return this.dashboardService.dashboardData();
    }
}
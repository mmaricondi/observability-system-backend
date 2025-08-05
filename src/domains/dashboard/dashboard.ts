import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
    dashboardData(): string {
        return 'This is the dashboard data';
    }
}
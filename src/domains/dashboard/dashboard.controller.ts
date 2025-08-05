import { Body, Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@domains/auth/auth.guard';


@Controller('dashboard')
export class DashboardController {
    @Get()
    @UseGuards(AuthGuard)
    dashboard(@Request() req: any) {
        return 'dados do dashboard';
    }

    @Get('all')
    @UseGuards(AuthGuard)
    all(@Request() req: any) {
        return 'todos os dados do dashboard';
    }
}
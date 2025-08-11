import { Body, Controller, Get, Post, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from '@domains/auth/auth';
import { AuthGuard } from '@domains/auth/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly auth: AuthService) {}

    @Post('login')
    @HttpCode(200)
    login(@Body() body: { email: string }) {
        return this.auth.login(body);
    }

    @Post('code')
    @HttpCode(200)
    code(@Body() body: { email: string; code: string }) {
        return this.auth.validateCode(body);
    }

    @Get('validate')
    @UseGuards(AuthGuard)
    validate() {
        return { message: 'You are authenticated', statusCode: 200 };
    }
}
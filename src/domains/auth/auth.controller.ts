import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth';

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
}

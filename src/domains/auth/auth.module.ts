import { Module } from '@nestjs/common';
import { AuthController } from '@domains/auth/auth.controller';
import { AuthService } from '@domains/auth/auth';
import { MailModule } from '@domains/mail/mail.module';
import { UserModule } from '@domains/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@domains/auth/constraints';

@Module({
  imports: [
    MailModule, 
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

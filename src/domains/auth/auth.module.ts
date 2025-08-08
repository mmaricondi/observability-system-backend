import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@domains/auth/auth.controller';
import { AuthService } from '@domains/auth/auth';
import { jwtConstants } from '@src/domains/auth/constants';
import { MailModule } from '@services/mail/mail.module';
import { UserModule } from '@repositories/user/user.module';

@Module({
  imports: [
    MailModule, 
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' }
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

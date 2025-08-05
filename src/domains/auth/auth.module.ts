import { Module } from '@nestjs/common';
import { AuthController } from '@domains/auth/auth.controller';
import { AuthService } from '@domains/auth/auth';
import { MailModule } from '@domains/mail/mail.module';
import { UserModule } from '@domains/user/user.module';

@Module({
  imports: [MailModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

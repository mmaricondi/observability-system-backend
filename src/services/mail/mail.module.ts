import { Module } from '@nestjs/common';
import { MailService } from '@services/mail/mail';

@Module({
  providers: [MailService],
  exports: [MailService] 
})
export class MailModule {}

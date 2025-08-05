import { Module } from '@nestjs/common';
import { MailService } from './mail';

@Module({
  providers: [MailService],
  exports: [MailService] 
})
export class MailModule {}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MailService } from '@src/services/mail/mail';

@Module({
  imports: [HttpModule],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}

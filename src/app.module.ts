import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domains/auth/auth.module';
import { MailModule } from './domains/mail/mail.module';
import { UserModule } from './domains/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'click',
      password: '123456',
      database: 'services',
      autoLoadEntities: true,
      synchronize: true,
    }), 
    AuthModule, 
    MailModule, 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor() {}
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { DashboardController } from '@domains/dashboard/dashboard.controller';
import { AuthModule } from '@domains/auth/auth.module';
import { MailModule } from '@domains/mail/mail.module';
import { UserModule } from '@domains/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
        })
    }), 
    AuthModule, 
    MailModule, 
    UserModule
  ],
  controllers: [AppController, DashboardController],
  providers: [AppService],
})
export class AppModule {
    constructor() {}
}

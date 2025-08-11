import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '@src/app.service';
import { AuthModule } from '@domains/auth/auth.module';
import { MailModule } from '@services/mail/mail.module';
import { TasksModule } from '@services/scheduler/tasks.module';
import { DashboardModule } from '@domains/dashboard/dashboard.module';
import { SeedModule } from '@scripts/seed.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
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
    DashboardModule,
    TasksModule,
    SeedModule
  ],
  providers: [AppService],
})
export class AppModule {
    constructor() {}
}

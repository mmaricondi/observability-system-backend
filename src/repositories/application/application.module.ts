import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from '@repositories/application/application';
import { Application } from '@entities/application.entity';
import { Event } from '@entities/event.entity';

@Module({
    providers: [ApplicationService],
    imports: [TypeOrmModule.forFeature([Application, Event])],
    exports: [ApplicationService]
})
export class ApplicationModule {}

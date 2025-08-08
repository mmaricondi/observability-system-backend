import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from '@repositories/event/event';
import { Event } from '@entities/event.entity';

@Module({
    providers: [EventService],
    imports: [TypeOrmModule.forFeature([Event])],
    exports: [EventService]
})
export class EventModule {}

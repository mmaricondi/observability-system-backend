import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from '@repositories/application/application';
import { Application } from '@entities/application.entity';

@Module({
    providers: [ApplicationService],
    imports: [TypeOrmModule.forFeature([Application])],
    exports: [ApplicationService],
})
export class ServiceModule {}

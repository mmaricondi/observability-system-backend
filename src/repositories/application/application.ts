import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '@entities/application.entity';
import { APPLICATION_NAME } from '@helpers/enums/application.enum';
import { Event } from '@entities/event.entity';
@Injectable()
export class ApplicationService {
    constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

    async findAll(): Promise<Application[] | []> {
      const apps = await this.applicationRepository.find({
        relations: ['events']
      })

      for (const app of apps) {
        app.events = await this.eventRepository.find({
          where: { application: { id: app.id } },
          order: { created_at: 'DESC' },
          take: 10,
        });
      }
      return apps.filter(app => app.events && app.events.length > 0);    
    }
    async findByName(name: APPLICATION_NAME): Promise<Application | null> {
      return await this.applicationRepository.findOneBy({ name });
    }
    async create(applications: Partial<Application>): Promise<void> {
      await this.applicationRepository.upsert(applications, ['name']);
    }
}

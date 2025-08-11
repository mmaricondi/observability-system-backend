import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '@entities/application.entity';
import { APPLICATION_NAME } from '@helpers/enums/application.enum';

@Injectable()
export class ApplicationService {
    constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

    async findAll(): Promise<Application[] | []> {
      const apps = await this.applicationRepository.find({
        relations: ['events']
      })
      return apps.filter(app => app.events && app.events.length > 0);    
    }
    async findByName(name: APPLICATION_NAME): Promise<Application | null> {
      return await this.applicationRepository.findOneBy({ name });
    }
    async create(applications: Partial<Application>): Promise<void> {
      await this.applicationRepository.upsert(applications, ['name']);
    }
}

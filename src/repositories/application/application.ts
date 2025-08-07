import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '@entities/application.entity';

@Injectable()
export class ApplicationService {
    constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

    async findAll(): Promise<Application[] | []> {
        return await this.applicationsRepository.find()
    }
}

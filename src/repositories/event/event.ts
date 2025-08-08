import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Event } from '@entities/event.entity';

@Injectable()
export class EventService {
    constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}
  async getByApplicationId(applicationIds: number[]): Promise<Event[]> {
    return this.eventRepository.find({ 
      where: { application: { id: In(applicationIds) } },
      relations: ['application']
    });
  }
  async save(data: Partial<Event>): Promise<void> {
    console.log('Saving event:', data);
    await this.eventRepository.save(data)
  }
}

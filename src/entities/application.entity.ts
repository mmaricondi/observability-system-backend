import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';
import { Event } from '@entities/event.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @Column()
  updated_at?: Date;
  
  @Column()
  @Unique(["name"])
  name?: string;

  @Column()
  type?: string;

  @OneToMany(() => Event, (event) => event.application, {
    cascade: true
  })
  events?: Event[];
}
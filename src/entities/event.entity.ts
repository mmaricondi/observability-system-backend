import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Application } from '@entities/application.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  created_at?: Date;

  @Column()
  description?: string;

  @Column()
  status?: string

  @ManyToOne(() => Application, (application) => application.events, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'application_id' }) 
  application: Application;
}
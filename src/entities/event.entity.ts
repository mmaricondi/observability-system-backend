import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  message: string;

  @Column()
  status: string
}
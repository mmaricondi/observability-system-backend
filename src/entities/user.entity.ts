import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  username: string;

  @Column()
  code: string;

  @Column({ default: false })
  isActive?: boolean;
}
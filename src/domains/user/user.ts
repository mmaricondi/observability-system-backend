import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/user.entity';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    async upsertUser(user: User): Promise<void> {
        const newUser = this.usersRepository.create({ ...user });
        await this.usersRepository.upsert(newUser, ['email']);
    }
}

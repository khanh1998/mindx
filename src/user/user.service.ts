import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserBase } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async save(user: UserBase): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    const payload: UserBase = { ...user, password: hash };
    return await this.usersRepository.save(payload);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ where: { username } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

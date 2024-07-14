import { HttpException, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(name: string, email: string, password: string) {
    const user = this.usersRepository.create({ name, email, password });
    return this.usersRepository.save(user);
  }

  async findAll(email?: string) {
    return this.usersRepository.find({
      where: { email: ILike(`%${email}%`) },
    });
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return this.usersRepository.remove(user);
  }
}

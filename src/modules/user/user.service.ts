import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({ id })
  }

  async create(data: CreateUserDto) {
    const user = await this.userRepo.create(data)
    this.userRepo.save(user)
    return user
  }

  async update(id: number, body: UpdateUserDto) {
    await this.userRepo.update({ id }, body)
    return await this.userRepo.findOneBy({ id })
  }

  async delete(id: number) {
    return await this.userRepo.delete({ id })
  }
}

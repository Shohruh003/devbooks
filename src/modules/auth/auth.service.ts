import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(email: string, password: string) {
    console.log(email, password);
    
    const user = this.userRepo.findOne({ where: {email, password} })
  }

  async create(data) {
    try {
    const {email, first_name, last_name, password, phone} = data
    const {raw:[{id}]} = await this.userRepo.createQueryBuilder()
    .insert()
    .into(User)
    .values({email, first_name, last_name, password, phone, })
    .execute()
    const token = this.jwtService.sign({userId: id})
    return {access_token: token}
    } catch (error) {
      console.log(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../../user/entities/user.entity';
import { Repository } from 'typeorm';
import {
  GetUserByEmailOutboundPort,
  GetUserByEmailOutboundPortOutputDto,
} from './../outbound-port/get-user-by-email.outbound-port';

@Injectable()
export class GetUserByEmailRepository implements GetUserByEmailOutboundPort {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(email: string): Promise<GetUserByEmailOutboundPortOutputDto> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { profile: true },
    });
    return user;
  }
}

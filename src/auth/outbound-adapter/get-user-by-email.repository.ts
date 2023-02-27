import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetUserByEmailOutboundPort,
  GetUserByEmailOutboundPortOutputDto,
} from '../outbound-port/get-user-by-email.outbound-port';

@Injectable()
export class GetUserByEmailRepository implements GetUserByEmailOutboundPort {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(email: string): Promise<GetUserByEmailOutboundPortOutputDto> {
    return (await this.userRepository.findOne({
      select: {
        userId: true,
        password: {
          password: true,
          updatedAt: true,
        },
        profileId: true,
        profile: {
          nickname: true,
        },
      },
      where: { email },
      relations: { password: true, profile: true },
    })) as unknown as GetUserByEmailOutboundPortOutputDto;
  }
}

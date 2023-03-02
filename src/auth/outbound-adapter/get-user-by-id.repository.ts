import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import {
  GetUserByIdOutboundPort,
  GetUserByIdOutboundPortOutputDto,
} from '../outbound-port/get-user-by-id.outbound-port';

@Injectable()
export class GetUserByIdRepository implements GetUserByIdOutboundPort {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(userId: number): Promise<GetUserByIdOutboundPortOutputDto> {
    return await this.userRepository.findOne({
      where: { userId },
      select: { userId: true, profileId: true },
    });
  }
}

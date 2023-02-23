import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetProfileByUserIdOutboundPort,
  GetProfileByUserIdOutboundPortOutputDto,
} from '../outbound-port/get-profile-by-user-id.outbound-port';

@Injectable()
export class GetProfileByUserIdRepository
  implements GetProfileByUserIdOutboundPort
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(
    userId: number,
  ): Promise<GetProfileByUserIdOutboundPortOutputDto> {
    return (await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        profile: { bio: true, nickname: true, avatarUrl: true },
      },
      relations: {
        profile: true,
      },
    })) as unknown as GetProfileByUserIdOutboundPortOutputDto;
  }
}

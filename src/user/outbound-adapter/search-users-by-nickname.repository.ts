import { Injectable } from '@nestjs/common';
import { SearchUsersByEmailOutboundPort } from '../outbound-port/search-users-by-email.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Like, Repository } from 'typeorm';
import { SearchUsersByEmailInboundPortOutputDto } from '../inbound-port/search-users-by-email.inbound-port';

@Injectable()
export class SearchUsersByEmailRepository
  implements SearchUsersByEmailOutboundPort
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async execute(
    email: string,
  ): Promise<SearchUsersByEmailInboundPortOutputDto[]> {
    return (await this.userRepository.find({
      where: { email: Like(`${email}%`) },
      relations: { profile: true },
      select: {
        id: true,
        profile: { nickname: true, avatarUrl: true },
      },
    })) as unknown as SearchUsersByEmailInboundPortOutputDto[];
  }
}

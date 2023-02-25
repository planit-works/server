import { Injectable } from '@nestjs/common';
import {
  SearchUsersByNicknameOutboundPort,
  SearchUsersByNicknameOutboundPortOutputDto,
} from '../outbound-port/search-users-by-nickname.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Profile } from '../../entities/profile.entity';

@Injectable()
export class SearchUsersByNicknameRepository
  implements SearchUsersByNicknameOutboundPort
{
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  async execute(
    nickname: string,
  ): Promise<SearchUsersByNicknameOutboundPortOutputDto[]> {
    return (await this.profileRepository.find({
      where: { nickname: Like(`${nickname}%`) },
      relations: { user: true },
      select: {
        id: true,
        nickname: true,
        avatarUrl: true,
        bio: true,
        user: { id: true },
      },
    })) as unknown as SearchUsersByNicknameOutboundPortOutputDto[];
  }
}

import { Injectable } from '@nestjs/common';
import {
  SearchUsersByNicknameOutboundPort,
  SearchUsersByNicknameOutboundPortInputDto,
} from '../outbound-port/search-users-by-nickname.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Profile } from '../../entities';

@Injectable()
export class SearchUsersByNicknameRepository
  implements SearchUsersByNicknameOutboundPort
{
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  async execute(
    params: SearchUsersByNicknameOutboundPortInputDto,
  ): Promise<Profile[]> {
    return await this.profileRepository.find({
      where: { nickname: Like(`${params.nickname}%`) },
      relations: { user: true },
      select: {
        profileId: true,
        nickname: true,
        image: { url: true },
        bio: true,
        user: { userId: true },
      },
      skip: params.skip,
      take: params.limit,
    });
  }
}

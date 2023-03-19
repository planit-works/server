import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SearchUsersTotalCountOutboundPort } from '../outbound-port/search-users-total-count.outbound-port';
import { Profile } from '../../entities';

@Injectable()
export class SearchUsersTotalCountRepository
  implements SearchUsersTotalCountOutboundPort
{
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async execute(nickname: string): Promise<number> {
    return await this.profileRepository.count({
      where: { nickname: Like(`${nickname}%`) },
    });
  }
}

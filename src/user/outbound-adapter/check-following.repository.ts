import { Injectable } from '@nestjs/common';
import {
  CheckFollowingOutboundPort,
  CheckFollowingOutboundPortInputDto,
} from '../outbound-port/check-following.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from '../../entities/follow.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CheckFollowingRepository implements CheckFollowingOutboundPort {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
  ) {}

  async execute(params: CheckFollowingOutboundPortInputDto): Promise<Follow[]> {
    const { followerId, followingIds } = params;
    const follows = await this.followRepository.find({
      where: { followerId, followingId: In(followingIds) },
    });
    return follows;
  }
}

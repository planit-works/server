import { Follow } from '../../entities/follow.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetFollowCountOutboundPort,
  GetFollowCountOutboundPortOutputDto,
} from '../outbound-port/get-follow-count.outbound-port';

@Injectable()
export class GetFollowCountRepository implements GetFollowCountOutboundPort {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
  ) {}

  async execute(userId: number): Promise<GetFollowCountOutboundPortOutputDto> {
    const [followingCount, followerCount] = await Promise.all([
      this.followRepository.countBy({
        followerId: userId,
      }),
      this.followRepository.countBy({
        followingId: userId,
      }),
    ]);
    return { followerCount, followingCount };
  }
}

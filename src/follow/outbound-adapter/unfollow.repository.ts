import { BadRequestException, Injectable } from '@nestjs/common';
import { UnfollowOutboundPort } from '../outbound-port/unfollow.outbount-port';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from '../../entities/follow.entity';
import { Repository } from 'typeorm';
import { UnfollowInboundPortInputDto } from '../inbound-port/unfollow.inbound-port';

@Injectable()
export class UnfollowRepository implements UnfollowOutboundPort {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
  ) {}
  async execute(params: UnfollowInboundPortInputDto): Promise<void> {
    const { unfollowerId, unfollowingId } = params;
    const follow = await this.followRepository.findOne({
      where: {
        followerId: unfollowerId,
        followingId: unfollowingId,
      },
    });
    if (!follow) {
      throw new BadRequestException('Bad Request');
    }
    await this.followRepository.remove(follow);
    return;
  }
}

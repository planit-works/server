import { FollowOutboundPortInputDto } from '../outbound-port/follow.outbound-port';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from '../../entities/follow.entity';
import { FollowOutboundPort } from '../outbound-port/follow.outbound-port';

@Injectable()
export class FollowRepository implements FollowOutboundPort {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
  ) {}

  async execute(params: FollowOutboundPortInputDto): Promise<void> {
    const { followerId, followingId } = params;
    const isAlreadyFollowing = await this.followRepository.exist({
      where: {
        followerId,
        followingId,
      },
    });

    if (isAlreadyFollowing) {
      throw new BadRequestException('Bad Request');
    }

    const follow = await this.followRepository.create({
      followerId,
      followingId,
    });

    await this.followRepository.save(follow);
    return;
  }
}

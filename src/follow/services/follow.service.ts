import {
  FollowInboundPort,
  FollowInboundPortInputDto,
} from '../inbound-port/follow.inbount-port';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CheckUserExistOutboundPort } from '../outbound-port/check-user-exist.outbound-port';
import { FollowOutboundPort } from '../outbound-port/follow.outbound-port';
import { FollowRepository } from '../outbound-adapter/follow.repository';
import { CheckUserExistRepository } from '../outbound-adapter/check-user-exist.repository';

@Injectable()
export class FollowService implements FollowInboundPort {
  constructor(
    @Inject(CheckUserExistRepository)
    private checkUserExistOutboundPort: CheckUserExistOutboundPort,
    @Inject(FollowRepository) private followRepository: FollowOutboundPort,
  ) {}

  async execute(params: FollowInboundPortInputDto): Promise<void> {
    const { followerId, followingId } = params;
    if (followerId === followingId) {
      throw new BadRequestException('Bad Request');
    }
    const hasUserExist = await this.checkUserExistOutboundPort.execute(
      followingId,
    );
    if (!hasUserExist) {
      throw new BadRequestException('존재하지 않는 유저');
    }
    await this.followRepository.execute(params);
    return;
  }
}

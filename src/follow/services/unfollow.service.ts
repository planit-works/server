import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CheckUserExistRepository } from '../outbound-adapter/check-user-exist.repository';
import { CheckUserExistOutboundPort } from '../outbound-port/check-user-exist.outbound-port';
import {
  UnfollowInboundPort,
  UnfollowInboundPortInputDto,
} from '../inbound-port/unfollow.inbound-port';
import { UnfollowOutboundPort } from '../outbound-port/unfollow.outbount-port';
import { UnfollowRepository } from '../outbound-adapter/unfollow.repository';

@Injectable()
export class UnfollowService implements UnfollowInboundPort {
  constructor(
    @Inject(CheckUserExistRepository)
    private checkUserExistOutboundPort: CheckUserExistOutboundPort,
    @Inject(UnfollowRepository)
    private unfollowOutboundPort: UnfollowOutboundPort,
  ) {}
  async execute(params: UnfollowInboundPortInputDto): Promise<void> {
    const { unfollowerId, unfollowingId } = params;
    if (unfollowerId === unfollowingId) {
      throw new BadRequestException('Bad Request');
    }
    const hasUserExist = await this.checkUserExistOutboundPort.execute(
      unfollowingId,
    );
    if (!hasUserExist) {
      throw new BadRequestException('Bad Request');
    }
    await this.unfollowOutboundPort.execute(params);
    return;
  }
}

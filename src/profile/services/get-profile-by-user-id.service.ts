import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  GetProfileByUserIdInboundPort,
  GetProfileByUserIdInboundPortInputDto,
  GetProfileByUserIdInboundPortOutputDto,
} from '../inbound-port/get-profile-by-user-id.inbound-port';
import { GetProfileByUserIdRepository } from '../outbound-adapter/get-profile-by-user-id.repository';
import { GetProfileByUserIdOutboundPort } from '../outbound-port/get-profile-by-user-id.outbound-port';
import { GetFollowCountRepository } from '../outbound-adapter/get-follow-count.repository';
import { GetFollowCountOutboundPort } from '../outbound-port/get-follow-count.outbound-port';
import { CheckFollowingRepository } from '../../follow/outbound-adapter/check-following.repository';
import { CheckFollowingOutboundPort } from '../../follow/outbound-port/check-following.outbound-port';

@Injectable()
export class GetProfileByUserIdService
  implements GetProfileByUserIdInboundPort
{
  constructor(
    @Inject(GetProfileByUserIdRepository)
    private getProfileByIdOutboundPort: GetProfileByUserIdOutboundPort,
    @Inject(GetFollowCountRepository)
    private getFollowCountOutboundPort: GetFollowCountOutboundPort,
    @Inject(CheckFollowingRepository)
    private checkFollowingOutboundPort: CheckFollowingOutboundPort,
  ) {}

  async execute(
    params: GetProfileByUserIdInboundPortInputDto,
  ): Promise<GetProfileByUserIdInboundPortOutputDto> {
    const { currentUserId, userId } = params;
    const userProfile = await this.getProfileByIdOutboundPort.execute(userId);
    if (!userProfile) {
      throw new BadRequestException('Bad Request');
    }
    let isFollowing = null;
    if (currentUserId !== userId) {
      isFollowing = await this.checkFollowingOutboundPort.execute({
        userId: currentUserId,
        followingId: userId,
      });
    }
    const { followerCount, followingCount } =
      await this.getFollowCountOutboundPort.execute(userId);

    return {
      userId: userProfile.userId,
      email: currentUserId === userId ? userProfile.email : null,
      profile: {
        nickname: userProfile.profile.nickname,
        avatarUrl: userProfile.profile.image.url,
        bio: userProfile.profile.bio,
      },
      followerCount,
      followingCount,
      isFollowing,
    };
  }
}

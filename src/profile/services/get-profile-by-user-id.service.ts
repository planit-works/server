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

@Injectable()
export class GetProfileByUserIdService
  implements GetProfileByUserIdInboundPort
{
  constructor(
    @Inject(GetProfileByUserIdRepository)
    private getProfileByIdOutboundPort: GetProfileByUserIdOutboundPort,
    @Inject(GetFollowCountRepository)
    private getFollowCountOutboundPort: GetFollowCountOutboundPort,
  ) {}

  async execute(
    params: GetProfileByUserIdInboundPortInputDto,
  ): Promise<GetProfileByUserIdInboundPortOutputDto> {
    const { currentUserId, userId } = params;
    const userProfile = await this.getProfileByIdOutboundPort.execute(userId);
    if (!userProfile) {
      throw new BadRequestException('Bad Request');
    }
    if (currentUserId !== userId) {
      delete userProfile.email;
    }
    const { followerCount, followingCount } =
      await this.getFollowCountOutboundPort.execute(userId);

    return { ...userProfile, followerCount, followingCount };
  }
}

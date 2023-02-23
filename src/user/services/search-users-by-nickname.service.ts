import { Inject, Injectable } from '@nestjs/common';
import {
  SearchUsersByNicknameInboundPort,
  SearchUsersByNicknameInboundPortInputDto,
  SearchUsersByNicknameInboundPortOutputDto,
} from '../inbound-port/search-users-by-nickname.inbound-port';
import { SearchUsersByNicknameOutboundPort } from '../outbound-port/search-users-by-nickname.outbound-port';
import { SearchUsersByNicknameRepository } from '../outbound-adapter/search-users-by-nickname.repository';
import { CheckFollowingOutboundPort } from '../outbound-port/check-following.outbound-port';
import { CheckFollowingRepository } from '../outbound-adapter/check-following.repository';

@Injectable()
export class SearchUsersByNicknameService
  implements SearchUsersByNicknameInboundPort
{
  constructor(
    @Inject(SearchUsersByNicknameRepository)
    private searchUsersByNicknameOutboundPort: SearchUsersByNicknameOutboundPort,
    @Inject(CheckFollowingRepository)
    private checkFollowingOutboundPort: CheckFollowingOutboundPort,
  ) {}

  async execute(
    params: SearchUsersByNicknameInboundPortInputDto,
  ): Promise<SearchUsersByNicknameInboundPortOutputDto[]> {
    const { userId, nickname } = params;
    const profiles = await this.searchUsersByNicknameOutboundPort.execute(
      nickname,
    );
    const followingIds = profiles.map((profile) => profile.userId);
    const follows = await this.checkFollowingOutboundPort.execute({
      followerId: userId,
      followingIds,
    });
    const followingUsers = follows.map((follow) => follow.followingId);
    return profiles.map((profile) => ({
      id: profile.id,
      userId: profile.userId,
      nickname: profile.nickname,
      avatarUrl: profile.avatarUrl,
      bio: profile.bio,
      isFollowing: followingUsers.includes(profile.userId),
    }));
  }
}

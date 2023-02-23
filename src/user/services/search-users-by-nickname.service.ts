import { Inject, Injectable } from '@nestjs/common';
import {
  SearchUsersByEmailInboundPort,
  SearchUsersByEmailInboundPortInputDto,
  SearchUsersByEmailInboundPortOutputDto,
} from '../inbound-port/search-users-by-email.inbound-port';
import { SearchUsersByEmailOutboundPort } from '../outbound-port/search-users-by-email.outbound-port';
import { SearchUsersByEmailRepository } from '../outbound-adapter/search-users-by-email.repository';
import { CheckFollowingOutboundPort } from '../outbound-port/check-following.outbound-port';
import { CheckFollowingRepository } from '../outbound-adapter/check-following.repository';

@Injectable()
export class SearchUsersByEmailService
  implements SearchUsersByEmailInboundPort
{
  constructor(
    @Inject(SearchUsersByEmailRepository)
    private searchUsersByEmailOutboundPort: SearchUsersByEmailOutboundPort,
    @Inject(CheckFollowingRepository)
    private checkFollowingOutboundPort: CheckFollowingOutboundPort,
  ) {}

  async execute(
    params: SearchUsersByEmailInboundPortInputDto,
  ): Promise<SearchUsersByEmailInboundPortOutputDto[]> {
    const { userId, email } = params;
    const users = await this.searchUsersByEmailOutboundPort.execute(email);
    const followingIds = users.map((user) => user.id);
    const follows = await this.checkFollowingOutboundPort.execute({
      followerId: userId,
      followingIds,
    });
    const followingUsers = follows.map((follow) => follow.followingId);
    return users.map((user) => ({
      id: user.id,
      profile: {
        nickname: user.profile.nickname,
        avatarUrl: user.profile.avatarUrl,
      },
      isFollowing: followingUsers.includes(user.id),
    }));
  }
}

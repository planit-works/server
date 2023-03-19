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
import { pipe, map, toArray, countBy } from '@fxts/core';
import { SearchUsersTotalCountOutboundPort } from '../outbound-port/search-users-total-count.outbound-port';
import { SearchUsersTotalCountRepository } from '../outbound-adapter/search-users-total-count.repository';

@Injectable()
export class SearchUsersByNicknameService
  implements SearchUsersByNicknameInboundPort
{
  constructor(
    @Inject(SearchUsersTotalCountRepository)
    private searchUsersTotalCountRepository: SearchUsersTotalCountOutboundPort,
    @Inject(SearchUsersByNicknameRepository)
    private searchUsersByNicknameOutboundPort: SearchUsersByNicknameOutboundPort,
    @Inject(CheckFollowingRepository)
    private checkFollowingOutboundPort: CheckFollowingOutboundPort,
  ) {}

  async execute(
    params: SearchUsersByNicknameInboundPortInputDto,
  ): Promise<SearchUsersByNicknameInboundPortOutputDto> {
    const { userId, nickname, paginationOptions } = params;
    const totalCount = await this.searchUsersTotalCountRepository.execute(
      nickname,
    );
    const lastPage = Math.ceil(totalCount / paginationOptions.getLimit());
    const profiles = await this.searchUsersByNicknameOutboundPort.execute({
      nickname,
      limit: paginationOptions.getLimit(),
      order: paginationOptions.getOrder(),
      skip: paginationOptions.getSkip(),
      sortBy: paginationOptions.getSortBy(),
    });
    const followingIds = pipe(
      map((profile) => profile.user.userId, profiles),
      toArray,
    );
    const follows = await this.checkFollowingOutboundPort.execute({
      followerId: userId,
      followingIds,
    });
    const followingUsers = countBy((follow) => follow.followingId, follows);
    return {
      profiles: profiles.map((profile) => ({
        profileId: profile.profileId,
        userId: profile.user.userId,
        nickname: profile.nickname,
        avatarUrl: profile.image.url,
        bio: profile.bio,
        isFollowing: Boolean(followingUsers[profile.user.userId]),
      })),
      paginationInfo: {
        currentPage: paginationOptions.getPage(),
        hasNextPage: paginationOptions.getPage() < lastPage,
        hasPreviousPage: paginationOptions.getPage() > 1,
      },
    };
  }
}

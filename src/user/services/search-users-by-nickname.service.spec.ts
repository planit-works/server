import {
  SearchUsersByNicknameOutboundPort,
  SearchUsersByNicknameOutboundPortOutputDto,
} from '../outbound-port/search-users-by-nickname.outbound-port';
import {
  CheckFollowingOutboundPort,
  CheckFollowingOutboundPortInputDto,
} from '../outbound-port/check-following.outbound-port';
import { Follow } from '../../entities/follow.entity';
import { SearchUsersByNicknameService } from './search-users-by-nickname.service';
import { countBy } from '@fxts/core';

class MockSearchUsersByNicknameOutboundPort
  implements SearchUsersByNicknameOutboundPort
{
  constructor(private profiles: SearchUsersByNicknameOutboundPortOutputDto[]) {
    this.profiles = profiles;
  }

  async execute(
    nickname: string,
  ): Promise<SearchUsersByNicknameOutboundPortOutputDto[]> {
    const regex = new RegExp(`^${nickname}`);
    return Promise.resolve(
      this.profiles.filter((profile) =>
        profile.nickname.match(regex),
      ) as SearchUsersByNicknameOutboundPortOutputDto[],
    );
  }
}

class MockCheckFollowingOutboundPort implements CheckFollowingOutboundPort {
  constructor(private follows: Follow[]) {
    this.follows = follows;
  }
  async execute(params: CheckFollowingOutboundPortInputDto): Promise<Follow[]> {
    const { followerId, followingIds } = params;
    const followingUsers = countBy(
      (followingUser) => followingUser,
      followingIds,
    );

    return Promise.resolve(
      this.follows.filter(
        (follow) =>
          follow.followerId === followerId &&
          followingUsers[follow.followingId],
      ),
    );
  }
}

describe('SearchUsersByNicknameService Unit Test', () => {
  let searchUsersByNicknameService: SearchUsersByNicknameService;
  let profiles: SearchUsersByNicknameOutboundPortOutputDto[];
  let follows: Partial<Follow>[];
  beforeEach(() => {
    profiles = [
      {
        profileId: 1,
        user: { userId: 1 },
        nickname: 'mars123',
        bio: 'hi!',
        image: { url: 'avatars/1234' },
      },
      {
        profileId: 2,
        user: { userId: 2 },
        nickname: 'mars1234',
        bio: 'hi!',
        image: { url: 'avatars/1234' },
      },
      {
        profileId: 3,
        user: { userId: 3 },
        nickname: 'mars12345',
        bio: 'hi!',
        image: { url: 'avatars/1234' },
      },
      {
        profileId: 4,
        user: { userId: 4 },
        nickname: 'mars1231',
        bio: 'hi!',
        image: { url: 'avatars/1234' },
      },
    ];

    follows = [
      { followerId: 1, followingId: 1 },
      { followerId: 1, followingId: 4 },
    ];

    searchUsersByNicknameService = new SearchUsersByNicknameService(
      new MockSearchUsersByNicknameOutboundPort(profiles),
      new MockCheckFollowingOutboundPort(follows as Follow[]),
    );
  });

  test('SearchUsersByNicknameService??? ??????????????? ????????? ??? ??????.', async () => {
    expect(searchUsersByNicknameService).toBeDefined();
  });

  test('mars123?????? ????????? ?????? 4?????? ????????? ????????????', async () => {
    const result = await searchUsersByNicknameService.execute({
      userId: 1,
      nickname: 'mars123',
    });

    expect(result.length).toEqual(4);
  });

  test('mars1234??? ????????? ?????? 2?????? ????????? ????????????', async () => {
    const result = await searchUsersByNicknameService.execute({
      userId: 1,
      nickname: 'mars1234',
    });

    expect(result.length).toEqual(2);
  });

  test('mars1231??? ????????? ?????? 1?????? ????????? ????????????', async () => {
    const result = await searchUsersByNicknameService.execute({
      userId: 1,
      nickname: 'mars1231',
    });

    expect(result.length).toEqual(1);
  });

  test('1??? ????????? mars123?????? ????????? ?????? ????????? ?????? ?????? 2?????? ?????? ?????? 2?????? ????????????', async () => {
    const result = await searchUsersByNicknameService.execute({
      userId: 1,
      nickname: 'mars123',
    });

    expect(result.map((user) => user.isFollowing)).toStrictEqual([
      true,
      false,
      false,
      true,
    ]);
  });

  test('1??? ????????? mars1234??? ????????? ?????? ????????? ?????? ?????? ?????? 2?????? ????????????', async () => {
    const result = await searchUsersByNicknameService.execute({
      userId: 1,
      nickname: 'mars1234',
    });

    expect(result.map((user) => user.isFollowing)).toStrictEqual([
      false,
      false,
    ]);
  });

  test('1??? ????????? mars1231??? ????????? ?????? ????????? ?????? ????????? ????????????', async () => {
    const result = await searchUsersByNicknameService.execute({
      userId: 1,
      nickname: 'mars1231',
    });

    expect(result[0].isFollowing).toEqual(true);
  });
});

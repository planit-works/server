import {
  GetProfileByUserIdOutboundPort,
  GetProfileByUserIdOutboundPortOutputDto,
} from '../../../../src/profile/outbound-port/get-profile-by-user-id.outbound-port';
import {
  GetFollowCountOutboundPort,
  GetFollowCountOutboundPortOutputDto,
} from '../../../../src/profile/outbound-port/get-follow-count.outbound-port';
import { GetProfileByUserIdService } from '../../../../src/profile/services/get-profile-by-user-id.service';
import { Follow } from '../../../../src/entities/follow.entity';
import { BadRequestException } from '@nestjs/common';
import {
  CheckFollowingOutboundPort,
  CheckFollowingOutboundPortInputDto,
} from '../../../../src/follow/outbound-port/check-following.outbound-port';

class MockGetProfileByIdOutboundPort implements GetProfileByUserIdOutboundPort {
  constructor(private users: GetProfileByUserIdOutboundPortOutputDto[]) {
    this.users = users;
  }
  async execute(
    userId: number,
  ): Promise<GetProfileByUserIdOutboundPortOutputDto> {
    const user = this.users.find((user) => user.userId === userId);
    if (!user) {
      throw new BadRequestException('Bad Request');
    }
    return Promise.resolve(user);
  }
}

class MockGetFollowCountOutboundPort implements GetFollowCountOutboundPort {
  constructor(private follows: Partial<Follow>[]) {}

  async execute(userId: number): Promise<GetFollowCountOutboundPortOutputDto> {
    let followerCount = 0,
      followingCount = 0;
    this.follows.forEach((follow) => {
      if (follow.followerId === userId) followingCount++;
      if (follow.followingId === userId) followerCount++;
    });
    return Promise.resolve({ followerCount, followingCount });
  }
}

class MockCheckFollowingOutboundPort implements CheckFollowingOutboundPort {
  constructor(private follows: Partial<Follow>[]) {}

  async execute(params: CheckFollowingOutboundPortInputDto): Promise<boolean> {
    const { userId, followingId } = params;
    const follow = this.follows.findIndex(
      (follow) =>
        follow.followerId === userId && follow.followingId === followingId,
    );
    return follow !== -1;
  }
}

let getProfileByUserIdService: GetProfileByUserIdService;
let users: GetProfileByUserIdOutboundPortOutputDto[];
let follows: Partial<Follow>[];

describe('GetProfileByUserIdService Unit Test', () => {
  beforeEach(async () => {
    users = [
      {
        userId: 1,
        email: 'test1@gmail.com',
        profile: {
          nickname: 'kku',
          bio: 'hi!',
          image: {
            url: 'avatars/default',
          },
        },
      },
    ];

    follows = [
      { followerId: 1, followingId: 2 },
      { followerId: 2, followingId: 1 },
      { followerId: 1, followingId: 3 },
      { followerId: 4, followingId: 5 },
      { followerId: 3, followingId: 2 },
      { followerId: 4, followingId: 1 },
      { followerId: 3, followingId: 1 },
      { followerId: 6, followingId: 1 },
      { followerId: 7, followingId: 1 },
    ];

    getProfileByUserIdService = new GetProfileByUserIdService(
      new MockGetProfileByIdOutboundPort(users),
      new MockGetFollowCountOutboundPort(follows),
      new MockCheckFollowingOutboundPort(follows),
    );
  });

  test('GetProfileByUserIdService를 인스턴스로 생성할 수 있다.', async () => {
    expect(getProfileByUserIdService).toBeDefined();
  });

  test('존재하지 않는 유저의 프로필을 조회할 경우 400 상태코드를 반환한다.', async () => {
    await expect(
      getProfileByUserIdService.execute({ currentUserId: 1, userId: 2 }),
    ).rejects.toThrow(BadRequestException);
  });

  test('자신의 프로필을 조회할 경우 email을 포함한 프로필을 반환한다.', async () => {
    const result = await getProfileByUserIdService.execute({
      currentUserId: 1,
      userId: 1,
    });
    expect(result).toStrictEqual({
      userId: 1,
      email: 'test1@gmail.com',
      profile: {
        nickname: 'kku',
        avatarUrl: 'avatars/default',
        bio: 'hi!',
      },
      followingCount: 2,
      followerCount: 5,
      isFollowing: null,
    });
  });

  test('다른 유저의 프로필을 조회할 경우 email이 null인 프로필을 반환한다.', async () => {
    const result = await getProfileByUserIdService.execute({
      currentUserId: 2,
      userId: 1,
    });
    expect(result).toStrictEqual({
      userId: 1,
      email: null,
      profile: {
        nickname: 'kku',
        avatarUrl: 'avatars/default',
        bio: 'hi!',
      },
      followingCount: 2,
      followerCount: 5,
      isFollowing: true,
    });
  });
});

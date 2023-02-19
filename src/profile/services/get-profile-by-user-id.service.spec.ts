import {
  GetProfileByUserIdOutboundPort,
  GetProfileByUserIdOutboundPortOutputDto,
} from '../outbound-port/get-profile-by-user-id.outbound-port';
import {
  GetFollowCountOutboundPort,
  GetFollowCountOutboundPortOutputDto,
} from '../outbound-port/get-follow-count.outbound-port';
import { GetProfileByUserIdService } from './get-profile-by-user-id.service';
import { Follow } from '../../entities/follow.entity';
import { BadRequestException } from '@nestjs/common';

class MockGetProfileByIdOutboundPort implements GetProfileByUserIdOutboundPort {
  constructor(private users: GetProfileByUserIdOutboundPortOutputDto[]) {
    this.users = users;
  }
  async execute(
    userId: number,
  ): Promise<GetProfileByUserIdOutboundPortOutputDto> {
    const user = this.users.find((user) => user.id === userId);
    console.log(user);
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

let getProfileByUserIdService: GetProfileByUserIdService;
let users: GetProfileByUserIdOutboundPortOutputDto[];
let follows: Partial<Follow>[];

describe('GetProfileByUserIdService Unit Test', () => {
  beforeEach(async () => {
    users = [
      {
        id: 1,
        email: 'test1@gmail.com',
        profile: {
          nickname: 'kku',
          avatarUrl: 'avatars/123456789',
          bio: 'hi!',
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
      id: 1,
      email: 'test1@gmail.com',
      profile: {
        nickname: 'kku',
        avatarUrl: 'avatars/123456789',
        bio: 'hi!',
      },
      followingCount: 2,
      followerCount: 5,
    });
  });

  test('다른 유저의 프로필을 조회할 경우 email을 제외한 프로필을 반환한다.', async () => {
    const result = await getProfileByUserIdService.execute({
      currentUserId: 2,
      userId: 1,
    });
    expect(result).toStrictEqual({
      id: 1,
      profile: {
        nickname: 'kku',
        avatarUrl: 'avatars/123456789',
        bio: 'hi!',
      },
      followingCount: 2,
      followerCount: 5,
    });
  });
});

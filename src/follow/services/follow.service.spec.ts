import { User } from '../../entities/user.entity';
import { CheckUserExistOutboundPort } from '../outbound-port/check-user-exist.outbound-port';
import { FollowOutboundPort } from '../outbound-port/follow.outbound-port';
import { FollowInboundPortInputDto } from '../inbound-port/follow.inbount-port';
import { Follow } from '../../entities/follow.entity';
import { FollowService } from './follow.service';
import { BadRequestException } from '@nestjs/common';

class MockCheckUserExistOutboundPort implements CheckUserExistOutboundPort {
  private readonly users: Partial<User>[];

  constructor(users: Partial<User>[]) {
    this.users = users;
  }

  async execute(userId: number): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === userId);
    return Promise.resolve(index !== -1);
  }
}

class MockFollowOutboundPort implements FollowOutboundPort {
  private follows: Partial<Follow>[];

  constructor(follows: Partial<Follow>[]) {
    this.follows = follows;
  }

  async execute(params: FollowInboundPortInputDto): Promise<void> {
    const { followerId, followingId } = params;
    const index = this.follows.findIndex(
      (follow) =>
        follow.followerId === followerId && follow.followingId === followingId,
    );
    if (index !== -1) {
      throw new BadRequestException('Bad Request');
    }
    return Promise.resolve();
  }
}

let followService: FollowService;
let users: Partial<User>[];
let follows: Partial<Follow>[];

describe('FollowService 유닛 테스트', () => {
  beforeEach(async () => {
    users = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    follows = [
      { followerId: 1, followingId: 2 },
      { followerId: 2, followingId: 1 },
      { followerId: 1, followingId: 3 },
      { followerId: 4, followingId: 5 },
      { followerId: 3, followingId: 2 },
    ];

    followService = new FollowService(
      new MockCheckUserExistOutboundPort(users),
      new MockFollowOutboundPort(follows),
    );
  });

  test('FollowService를 인스턴스로 생성할 수 있다.', async () => {
    expect(followService).toBeDefined();
  });

  test('존재하지 않는 유저를 팔로우하면 400 에러를 반환한다.', async () => {
    await expect(
      followService.execute({
        followerId: 1,
        followingId: 6,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  test('이미 팔로우 중인 유저를 팔로우할 경우 400에러를 반환한다.', async () => {
    await expect(
      followService.execute({
        followerId: 1,
        followingId: 2,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  test('팔로우 중이지 않은 유저를 팔로우할 경우 void를 리턴한다.', async () => {
    await expect(
      followService.execute({
        followerId: 1,
        followingId: 4,
      }),
    ).resolves.not.toThrow();
  });
});

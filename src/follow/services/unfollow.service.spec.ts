import { MockCheckUserExistOutboundPort } from './follow.service.spec';
import {
  UnfollowOutboundPort,
  UnfollowOutboundPortInputDto,
} from '../outbound-port/unfollow.outbount-port';
import { Follow } from '../../entities/follow.entity';
import { BadRequestException } from '@nestjs/common';
import { UnfollowService } from './unfollow.service';
import { User } from '../../entities/user.entity';

class MockUnfollowOutboundPort implements UnfollowOutboundPort {
  private follows: Partial<Follow>[];

  constructor(follows: Partial<Follow>[]) {
    this.follows = follows;
  }

  async execute(params: UnfollowOutboundPortInputDto): Promise<void> {
    const { unfollowerId, unfollowingId } = params;
    const index = this.follows.findIndex(
      (follow) =>
        follow.followerId === unfollowerId &&
        follow.followingId === unfollowingId,
    );
    if (index === -1) {
      throw new BadRequestException('Bad Request');
    }
    return Promise.resolve();
  }
}

let unfollowService: UnfollowService;
let users: Partial<User>[];
let follows: Partial<Follow>[];

describe('UnfollowService Unit Testing', () => {
  beforeEach(() => {
    users = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    follows = [
      { followerId: 1, followingId: 2 },
      { followerId: 2, followingId: 1 },
      { followerId: 1, followingId: 3 },
      { followerId: 4, followingId: 5 },
      { followerId: 3, followingId: 2 },
    ];

    unfollowService = new UnfollowService(
      new MockCheckUserExistOutboundPort(users),
      new MockUnfollowOutboundPort(follows),
    );
  });

  test('UnfollowService를 인스턴스로 생성할 수 있다.', async () => {
    expect(unfollowService).toBeDefined();
  });

  test('자기 자신을 언팔로우할 경우 400에러를 반환한다.', async () => {
    await expect(
      unfollowService.execute({ unfollowerId: 1, unfollowingId: 1 }),
    ).rejects.toThrow(BadRequestException);
  });

  test('팔로우 중인 유저가 아닐 경우 400 에러를 반환한다.', async () => {
    await expect(
      unfollowService.execute({ unfollowerId: 1, unfollowingId: 4 }),
    ).rejects.toThrow(BadRequestException);
  });

  test('정상적인 요청에 대해 에러를 반환하지 않는다.', async () => {
    await expect(
      unfollowService.execute({ unfollowerId: 1, unfollowingId: 2 }),
    ).resolves.not.toThrow();
  });
});

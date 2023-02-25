import { Follow } from '../../entities/follow.entity';

export interface CheckFollowingOutboundPortInputDto {
  followerId: number;
  followingIds: number[];
}

export interface CheckFollowingOutboundPort {
  execute(params: CheckFollowingOutboundPortInputDto): Promise<Follow[]>;
}

export interface FollowInboundPortInputDto {
  followerId: number;
  followingId: number;
}

export interface FollowInboundPort {
  execute(params: FollowInboundPortInputDto): Promise<void>;
}

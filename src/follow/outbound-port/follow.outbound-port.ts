export interface FollowOutboundPortInputDto {
  followerId: number;
  followingId: number;
}

export interface FollowOutboundPort {
  execute(params: FollowOutboundPortInputDto): Promise<void>;
}

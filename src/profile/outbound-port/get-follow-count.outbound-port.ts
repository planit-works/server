export interface GetFollowCountOutboundPortOutputDto {
  followerCount: number;
  followingCount: number;
}

export interface GetFollowCountOutboundPort {
  execute(userId: number): Promise<GetFollowCountOutboundPortOutputDto>;
}

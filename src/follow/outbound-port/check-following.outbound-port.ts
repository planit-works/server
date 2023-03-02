export interface CheckFollowingOutboundPortInputDto {
  userId: number;
  followingId: number;
}

export interface CheckFollowingOutboundPort {
  execute(params: CheckFollowingOutboundPortInputDto): Promise<boolean>;
}

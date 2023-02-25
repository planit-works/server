export interface UnfollowInboundPortInputDto {
  unfollowerId: number;
  unfollowingId: number;
}

export interface UnfollowInboundPort {
  execute(params: UnfollowInboundPortInputDto): Promise<void>;
}

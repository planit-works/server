export interface UnfollowOutboundPortInputDto {
  unfollowerId: number;
  unfollowingId: number;
}

export interface UnfollowOutboundPort {
  execute(params: UnfollowOutboundPortInputDto): Promise<void>;
}

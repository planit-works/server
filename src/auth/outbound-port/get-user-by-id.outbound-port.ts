export interface GetUserByIdOutboundPortOutputDto {
  userId: number;
  profileId: number;
}

export interface GetUserByIdOutboundPort {
  execute(userId: number): Promise<GetUserByIdOutboundPortOutputDto>;
}

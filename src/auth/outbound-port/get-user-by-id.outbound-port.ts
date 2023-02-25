export interface GetUserByIdOutboundPortOutputDto {
  id: number;
  profileId: number;
}

export interface GetUserByIdOutboundPort {
  execute(userId: number): Promise<GetUserByIdOutboundPortOutputDto>;
}

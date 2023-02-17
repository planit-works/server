export interface GetProfileByUserIdOutboundPortOutputDto {
  id: number;
  email: string;
  profile: {
    nickname: string;
    avatarUrl: string;
    bio: string;
  };
}

export interface GetProfileByUserIdOutboundPort {
  execute(userId: number): Promise<GetProfileByUserIdOutboundPortOutputDto>;
}

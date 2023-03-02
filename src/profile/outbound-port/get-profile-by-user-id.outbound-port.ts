export interface GetProfileByUserIdOutboundPortOutputDto {
  userId: number;
  email: string;
  profile: {
    nickname: string;
    bio: string;
    image: {
      url: string;
    };
  };
}

export interface GetProfileByUserIdOutboundPort {
  execute(userId: number): Promise<GetProfileByUserIdOutboundPortOutputDto>;
}

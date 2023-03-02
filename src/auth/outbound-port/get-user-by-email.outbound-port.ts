export interface GetUserByEmailOutboundPortOutputDto {
  userId: number;
  profileId: number;
  password: {
    password: string;
  };
  profile: {
    nickname: string;
    image: {
      url: string;
    };
  };
}

export interface GetUserByEmailOutboundPort {
  execute(email: string): Promise<GetUserByEmailOutboundPortOutputDto>;
}

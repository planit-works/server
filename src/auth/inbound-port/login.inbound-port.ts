export interface LoginInboundPortInputDto {
  email: string;
  password: string;
}

export interface LoginInboundPortOutputDto {
  userId: number;
  profileId: number;
  profile: {
    nickname: string;
    avatarUrl: string;
  };
}

export interface LoginInboundPort {
  execute(params: LoginInboundPortInputDto): Promise<LoginInboundPortOutputDto>;
}

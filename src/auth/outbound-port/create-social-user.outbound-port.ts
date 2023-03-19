export interface CreateSocialUserOutboundPortInputDto {
  email: string;
  nickname: string;
  refreshToken: string;
  provider: string;
  avatarUrl: string;
}

export interface CreateSocialUserOutboundPortOutputDto {
  userId: number;
  profileId: number;
  profile: {
    nickname: string;
    image: {
      url: string;
    };
  };
}

export interface CreateSocialUserOutboundPort {
  execute(
    params: CreateSocialUserOutboundPortInputDto,
  ): Promise<CreateSocialUserOutboundPortOutputDto>;
}

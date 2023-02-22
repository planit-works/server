export interface SearchUsersByEmailInboundPortInputDto {
  userId: number;
  email: string;
}

export interface SearchUsersByEmailInboundPortOutputDto {
  id: number;
  isFollowing: boolean;
  profile: {
    nickname: string;
    avatarUrl: string;
  };
}

export interface SearchUsersByEmailInboundPort {
  execute(
    params: SearchUsersByEmailInboundPortInputDto,
  ): Promise<SearchUsersByEmailInboundPortOutputDto[]>;
}

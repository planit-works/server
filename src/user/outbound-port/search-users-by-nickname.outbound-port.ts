export interface SearchUsersByNicknameOutboundPortOutputDto {
  profileId: number;
  user: {
    userId: number;
  };
  nickname: string;
  bio: string;
  image: {
    url: string;
  };
}

export interface SearchUsersByNicknameOutboundPort {
  execute(
    nickname: string,
  ): Promise<SearchUsersByNicknameOutboundPortOutputDto[]>;
}

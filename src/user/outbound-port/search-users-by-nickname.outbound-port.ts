export interface SearchUsersByNicknameOutboundPortOutputDto {
  id: number;
  user: {
    id: number;
  };
  nickname: string;
  bio: string;
  avatarUrl: string;
}

export interface SearchUsersByNicknameOutboundPort {
  execute(
    nickname: string,
  ): Promise<SearchUsersByNicknameOutboundPortOutputDto[]>;
}

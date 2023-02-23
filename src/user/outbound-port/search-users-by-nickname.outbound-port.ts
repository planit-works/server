export interface SearchUsersByNicknameOutboundPortOutputDto {
  id: number;
  userId: number;
  nickname: string;
  bio: string;
  avatarUrl: string;
}

export interface SearchUsersByNicknameOutboundPort {
  execute(
    nickname: string,
  ): Promise<SearchUsersByNicknameOutboundPortOutputDto[]>;
}

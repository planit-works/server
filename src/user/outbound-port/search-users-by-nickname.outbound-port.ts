interface Profile {
  nickname: string;
  avatarUrl: string;
}

export interface SearchUsersByNicknameOutboundPortOutputDto {
  id: number;
  profile: Profile;
}

export interface SearchUsersByNicknameOutboundPort {
  execute(
    nickname: string,
  ): Promise<SearchUsersByNicknameOutboundPortOutputDto[]>;
}

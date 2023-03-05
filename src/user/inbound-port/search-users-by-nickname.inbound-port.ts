export interface SearchUsersByNicknameInboundPortInputDto {
  userId: number;
  nickname: string;
}

export interface SearchUsersByNicknameInboundPortOutputDto {
  profileId: number;
  userId: number;
  isFollowing: boolean;
  nickname: string;
  avatarUrl: string;
  bio: string;
}

export interface SearchUsersByNicknameInboundPort {
  execute(
    params: SearchUsersByNicknameInboundPortInputDto,
  ): Promise<SearchUsersByNicknameInboundPortOutputDto[]>;
}

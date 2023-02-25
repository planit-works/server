export interface GetProfileByUserIdInboundPortInputDto {
  currentUserId: number;
  userId: number;
}

export interface GetProfileByUserIdInboundPortOutputDto {
  id: number;
  email?: string;
  profile: {
    nickname: string;
    avatarUrl: string;
    bio: string;
  };
  followerCount: number;
  followingCount: number;
}

export interface GetProfileByUserIdInboundPort {
  execute(
    params: GetProfileByUserIdInboundPortInputDto,
  ): Promise<GetProfileByUserIdInboundPortOutputDto>;
}

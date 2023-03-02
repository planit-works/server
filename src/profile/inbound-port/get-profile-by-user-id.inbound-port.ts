export interface GetProfileByUserIdInboundPortInputDto {
  currentUserId: number;
  userId: number;
}

export interface GetProfileByUserIdInboundPortOutputDto {
  userId: number;
  email: string | null;
  profile: {
    nickname: string;
    avatarUrl: string;
    bio: string;
  };
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export interface GetProfileByUserIdInboundPort {
  execute(
    params: GetProfileByUserIdInboundPortInputDto,
  ): Promise<GetProfileByUserIdInboundPortOutputDto>;
}

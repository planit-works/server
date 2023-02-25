export interface UpdateProfileInboundPortInputDto {
  profileId: number;
  nickname?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface UpdateProfileInboundPort {
  execute(params: UpdateProfileInboundPortInputDto): Promise<void>;
}

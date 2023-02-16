export interface UpdateProfileOutboundPortInputDto {
  profileId: number;
  nickname?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface UpdateProfileOutboundPort {
  execute(params: UpdateProfileOutboundPortInputDto): Promise<void>;
}

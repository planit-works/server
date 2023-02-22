interface Profile {
  nickname: string;
  avatarUrl: string;
}

export interface SearchUsersByEmailOutboundPortOutputDto {
  id: number;
  profile: Profile;
}

export interface SearchUsersByEmailOutboundPort {
  execute(email: string): Promise<SearchUsersByEmailOutboundPortOutputDto[]>;
}

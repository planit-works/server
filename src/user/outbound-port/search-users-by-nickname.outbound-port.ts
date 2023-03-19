import { Profile } from '../../entities';

export interface SearchUsersByNicknameOutboundPortInputDto {
  nickname: string;
  limit: number;
  skip: number;
  order: string;
  sortBy: string;
}

export interface SearchUsersByNicknameOutboundPort {
  execute(
    params: SearchUsersByNicknameOutboundPortInputDto,
  ): Promise<Profile[]>;
}

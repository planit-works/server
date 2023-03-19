import { PaginationOptionsDto } from '../../common/types/pagination-options.dto';

export interface SearchUsersByNicknameInboundPortInputDto {
  userId: number;
  nickname: string;
  paginationOptions: PaginationOptionsDto;
}

export interface ProfileInfo {
  profileId: number;
  userId: number;
  isFollowing: boolean;
  nickname: string;
  avatarUrl: string;
  bio: string;
}

export class PaginationInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SearchUsersByNicknameInboundPortOutputDto {
  profiles: ProfileInfo[];
  paginationInfo: PaginationInfo;
}

export interface SearchUsersByNicknameInboundPort {
  execute(
    params: SearchUsersByNicknameInboundPortInputDto,
  ): Promise<SearchUsersByNicknameInboundPortOutputDto>;
}

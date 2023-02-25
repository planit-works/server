import { ApiProperty } from '@nestjs/swagger';

export class GetProfileByUserIdResDto {
  @ApiProperty({ example: '329', description: '유저 ID' })
  id: number;

  @ApiProperty({ example: 'test1234@gmail.com', description: '유저 이메일' })
  email?: string;

  @ApiProperty({
    example: {
      nickname: '봄날의 햇살 수연',
      avatarUrl: 'avatars/default',
      bio: '안녕하세요 김건우라고 해요. 잘 부탁해요 :)',
    },
    description: '프로필 정보',
  })
  profile: {
    nickname: string;
    avatarUrl: string;
    bio: string;
  };

  @ApiProperty({ example: '3', description: '나를 팔로우 하는 유저의 수' })
  followerCount: number;

  @ApiProperty({ example: '2', description: '내가 팔로우 하는 유저의 수' })
  followingCount: number;
}

import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Profile {
  profile: {
    nickname: string;
    avatarUrl: string;
  };
}

export class LoginResDto {
  @ApiProperty({ example: '329', description: '유저 ID' })
  @Transform(({ obj }) => obj.id)
  @Expose()
  userId: number;

  @ApiProperty({
    example: {
      nickname: '건우',
      avatarUrl: '클라우드 프론트 주소/avatars/default',
    },
    description: '프로필 정보',
  })
  @Transform(({ obj }) => {
    return {
      nickname: obj.profile.nickname,
      avatarUrl: `https://d2pkj6jz1ow9ba.cloudfront.net/${obj.profile.avatarUrl}`,
    };
  })
  @Expose()
  profile: Profile;
}

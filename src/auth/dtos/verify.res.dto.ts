import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Profile {
  profile: {
    nickname: string;
    avatarUrl: string;
  };
}

export class VerifyResDto {
  @ApiProperty({ example: '329', description: '유저 ID' })
  @Transform(({ obj }) => obj.userId)
  @Expose()
  userId: number;

  @ApiProperty({
    example: {
      nickname: '건우',
      avatarUrl: 'avatars/default',
    },
    description: '프로필 정보',
  })
  @Transform(({ obj }) => {
    return {
      nickname: obj.nickname,
      avatarUrl: obj.avatarUrl,
    };
  })
  @Expose()
  profile: Profile;
}

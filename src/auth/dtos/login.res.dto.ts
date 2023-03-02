import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class Profile {
  profile: {
    nickname: string;
    avatarUrl: string;
  };
}

export class LoginResDto {
  @ApiProperty({ example: '329', description: '유저 ID' })
  @Expose()
  userId: number;

  @ApiProperty({
    example: {
      nickname: '건우',
      avatarUrl: 'avatars/default',
    },
    description: '프로필 정보',
  })
  @Expose()
  profile: Profile;
}

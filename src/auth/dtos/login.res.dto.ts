import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty({ example: '329', description: '유저 ID' })
  @Expose()
  userId: number;

  @ApiProperty({
    example: 'https://어쩌구저쩌구/avatars/112309812390',
    description: '유저 프로필 사진 Url',
  })
  @Expose()
  avatarUrl: string;
}

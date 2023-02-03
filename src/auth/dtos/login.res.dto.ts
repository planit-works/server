import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty({ example: '329', description: '유저 ID' })
  @Transform(({ obj }) => obj.id)
  @Expose()
  userId: number;

  @ApiProperty({
    example: 'https://d2pkj6jz1ow9ba.cloudfront.net/avatars/default',
    description: '유저 프로필 사진 Url',
  })
  @Transform(
    ({ obj }) => `https://d2pkj6jz1ow9ba.cloudfront.net/${obj.avatarUrl}`,
  )
  @Expose()
  avatarUrl: string;
}

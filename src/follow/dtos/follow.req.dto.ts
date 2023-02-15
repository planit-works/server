import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FollowReqDto {
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: '팔로우의 대상 유저 ID',
    required: true,
  })
  followingId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UnfollowReqDto {
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: '언팔로우의 대상 유저 ID',
    required: true,
  })
  unfollowingId: number;
}

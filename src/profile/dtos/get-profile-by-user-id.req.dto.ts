import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetProfileByUserIdReqDto {
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: '숫자 형식',
    required: true,
  })
  userId: number;
}

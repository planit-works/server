import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchUsersByEmailReqQueryDto {
  @ApiProperty({
    description: '이메일 검색 키워드 | 5자 이상, 10자 이하',
    required: true,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  q: string;
}

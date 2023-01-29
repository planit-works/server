import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class ProfileUpdateReqDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(10)
  @ApiProperty({
    example: '봄날의 햇살 수연',
    description: '문자 형식 | 2자 이상 | 10자 이하',
    required: false,
  })
  nickname: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(12)
  @ApiProperty({
    example: 'avatars/1',
    description: 'AWS S3 버킷 주소를 제외한 키값만 전달',
    required: false,
  })
  avatarUrl: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateProfileReqDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(10)
  @ApiProperty({
    example: '봄날의 햇살 수연',
    description: '문자 형식 | 2자 이상 | 10자 이하',
    required: false,
  })
  nickname: string;

  @IsString()
  @IsOptional()
  @MinLength(14)
  @MaxLength(40)
  @ApiProperty({
    example: 'avatars/1123123',
    description: 'AWS S3 버킷 주소를 제외한 키값만 전달',
    required: false,
  })
  avatarUrl: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(1000)
  @ApiProperty({
    example: '안녕하세요 주저리 주저리 자기소개 등',
    description:
      '링크 등이 포함될 수 있다면 좋을 듯. 단순 텍스트 보다는 HTML 형식으로 가능할 지?',
    required: false,
  })
  bio: string;
}

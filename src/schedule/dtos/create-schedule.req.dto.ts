import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateScheduleReqDto {
  @IsString()
  @MaxLength(20)
  @ApiProperty({
    example: 'CS 스터디',
    description: '문자열 | 20자 이하',
    required: true,
  })
  title: string;

  @IsString()
  @MaxLength(300)
  @ApiProperty({
    example: '스케줄 상세 내용',
    description: '텍스트 |  | 300자 이하',
    required: false,
  })
  description: string;

  @IsNumber()
  year: number;

  @IsNumber()
  month: number;

  @IsNumber()
  day: number;

  @IsString()
  @IsOptional()
  startAt: string;

  @IsString()
  @IsOptional()
  endAt: string;
}

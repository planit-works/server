import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupReqDto {
  @IsEmail()
  @MinLength(10)
  @MaxLength(40)
  @ApiProperty({
    example: 'test01@gmail.com',
    description: '이메일 형식 | 10자 이상 | 40자 이하',
    required: true,
  })
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/, {
    message: '잘못된 비밀번호 형식',
  })
  @ApiProperty({
    example: 'test1234!',
    description:
      '소문자/숫자/특수문자($@$!%*?&만 가능) 1자 포함 | 8자 이상 | 16자 이하',
    required: true,
  })
  password: string;
}

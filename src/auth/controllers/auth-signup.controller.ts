import { User } from './../../user/entities/user.entity';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthSignupService } from '../services/auth-signup.service';
import { LoginResDto, SignupReqDto } from '../dtos';
import { Serialize } from '../../common/interceptors/serialize.interceptor';

@Controller('auth')
export class AuthSignupController {
  constructor(private readonly authSingupService: AuthSignupService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공', type: LoginResDto })
  @Post()
  @Serialize(LoginResDto)
  signup(@Body() signupDto: SignupReqDto): Promise<User> {
    return this.authSingupService.signup(signupDto);
  }
}

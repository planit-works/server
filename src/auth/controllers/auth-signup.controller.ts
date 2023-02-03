import { JwtService } from '@nestjs/jwt';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthSignupService } from '../services/auth-signup.service';
import { LoginResDto, SignupReqDto } from '../dtos';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { Response } from 'express';

@Controller('auth')
export class AuthSignupController {
  constructor(
    private readonly authSingupService: AuthSignupService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공', type: LoginResDto })
  @Post()
  @Serialize(LoginResDto)
  async signup(
    @Body() signupDto: SignupReqDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authSingupService.signup(signupDto);
    const payload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    response.cookie('Authorization', accessToken, { httpOnly: true });
    return user;
  }
}

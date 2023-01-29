import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthLoginService } from '../services/auth-login.service';
import { LoginReqDto, LoginResDto } from '../dtos';
import { Serialize } from '../../common/interceptors/serialize.interceptor';

@Controller('auth')
export class AuthLoginController {
  constructor(
    private readonly authLoginService: AuthLoginService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공', type: LoginResDto })
  @Post('login')
  @HttpCode(200)
  @Serialize(LoginResDto)
  async login(
    @Body() loginDto: LoginReqDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResDto> {
    const user = await this.authLoginService.login(loginDto);
    const payload = { userId: user.id, profileId: user.profile.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    response.cookie('Authorization', accessToken, { httpOnly: true });
    return { userId: user.id, avatarUrl: user.profile.avatarUrl };
  }
}

import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthLoginService } from '../services/auth-login.service';
import { LoginReqDto, LoginResDto } from '../dtos';
import { Serialize } from '../../interceptors/serialize.interceptor';

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
  ) {
    const userId = await this.authLoginService.login(loginDto);
    const payload = { userId };
    const accessToken = this.jwtService.sign(payload);
    response.setHeader('Set-Cookie', [
      `JWT=${accessToken}; HttpOnly; path=/`,
      `Authorization=${accessToken}; HttpOnly; path=/`,
    ]);
    response.cookie('Authorization', accessToken, { httpOnly: true });
    return userId;
  }
}

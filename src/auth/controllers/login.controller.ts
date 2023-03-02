import {
  LoginInboundPort,
  LoginInboundPortOutputDto,
} from '../inbound-port/login.inbound-port';
import { Controller, Post, Body, HttpCode, Res, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginService } from '../services/login.service';
import { LoginReqDto, LoginResDto } from '../dtos';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { TokenPayload } from '../../common/types/token-payload';

@Controller('api/auth')
export class LoginController {
  constructor(
    @Inject(LoginService)
    private readonly loginInboundPort: LoginInboundPort,
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
  ): Promise<LoginInboundPortOutputDto> {
    const user = await this.loginInboundPort.execute(loginDto);
    const payload: TokenPayload = {
      userId: user.userId,
      profileId: user.profileId,
      nickname: user.profile.nickname,
      avatarUrl: user.profile.avatarUrl,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    response.cookie('Authorization', accessToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return user;
  }
}

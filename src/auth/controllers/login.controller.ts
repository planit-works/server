import { User } from '../../entities/user.entity';
import { LoginInboundPort } from '../inbound-port/login.inbound-port';
import { TokenPayload } from '../types/token-payload';
import { Controller, Post, Body, HttpCode, Res, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginService } from '../services/login.service';
import { LoginReqDto, LoginResDto } from '../dtos';
import { Serialize } from '../../common/interceptors/serialize.interceptor';

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
  ): Promise<User> {
    const user = await this.loginInboundPort.execute(loginDto);
    const payload: TokenPayload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    response.cookie('Authorization', accessToken, { httpOnly: true });
    return user;
  }
}

import { User } from './../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Controller, Post, Body, Res, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignupService } from '../services';
import { LoginResDto, SignupReqDto } from '../dtos';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { Response } from 'express';
import { SignupInboundPort } from '../inbound-port/signup.inbound-port';

@Controller('auth')
export class SignupController {
  constructor(
    @Inject(SignupService)
    private readonly singupInboundPort: SignupInboundPort,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공', type: LoginResDto })
  @Post()
  @Serialize(LoginResDto)
  async signup(
    @Body() signupDto: SignupReqDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const user = await this.singupInboundPort.execute(signupDto);
    const payload = { userId: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    response.cookie('Authorization', accessToken, { httpOnly: true });
    return user;
  }
}

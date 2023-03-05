import { JwtService } from '@nestjs/jwt';
import { Controller, Post, Body, Res, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupService } from '../services';
import { SignupReqDto, SignupResDto } from '../dtos';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { Response } from 'express';
import {
  SignupInboundPort,
  SignupInboundPortOutputDto,
} from '../inbound-port/signup.inbound-port';
import { TokenPayload } from '../../common/types/token-payload';

@Controller('api/auth')
export class SignupController {
  constructor(
    @Inject(SignupService)
    private readonly singupInboundPort: SignupInboundPort,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: SignupResDto,
  })
  @ApiTags('Auth')
  @Post()
  @Serialize(SignupResDto)
  async signup(
    @Body() signupDto: SignupReqDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SignupInboundPortOutputDto> {
    const user = await this.singupInboundPort.execute(signupDto);
    const payload: TokenPayload = {
      userId: user.userId,
      profileId: user.profileId,
      nickname: user.profile.nickname,
      avatarUrl: user.profile.avatarUrl,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    response.cookie('Authorization', accessToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return user;
  }
}

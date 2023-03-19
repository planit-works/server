import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleLoginService } from '../services';
import {
  GoogleLoginInboundPort,
  GoogleLoginInboundPortInputDto,
} from '../inbound-port/google-login.inbound-port';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth/google')
export class GoogleLoginController {
  constructor(
    @Inject(GoogleLoginService)
    private googleLoginInboundPort: GoogleLoginInboundPort,
  ) {}

  @Get('login')
  @UseGuards(AuthGuard('google'))
  handleLogin() {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async handleRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.googleLoginInboundPort.execute({
      ...(req.user as GoogleLoginInboundPortInputDto),
      provider: 'google',
    });
    if (!result) {
      return res.redirect('https://www.planit.p-e.kr/login?error=local');
    }
    return res.redirect('https://www.planit.p-e.kr');
  }
}

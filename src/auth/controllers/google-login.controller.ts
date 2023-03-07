import {
  Controller,
  Get,
  Inject,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoogleLoginService } from '../services';
import { GoogleAuthGuard } from '../utils/google.guard';
import {
  GoogleLoginInboundPort,
  GoogleLoginInboundPortInputDto,
} from '../inbound-port/google-login.inbound-port';
import { Request } from 'express';

@Controller('api/auth/google')
export class GoogleLoginController {
  constructor(
    @Inject(GoogleLoginService)
    private googleLoginInboundPort: GoogleLoginInboundPort,
  ) {}

  @Get('login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect('https://www.planit.p-e.kr', 301)
  handleRedirect(@Req() req: Request) {
    return this.googleLoginInboundPort.execute({
      ...(req.user as GoogleLoginInboundPortInputDto),
      provider: 'google',
    });
  }
}

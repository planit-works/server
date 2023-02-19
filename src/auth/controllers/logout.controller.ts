import { Controller, Post, HttpCode, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('api/auth')
export class AuthLogoutController {
  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 204, description: '로그아웃 성공' })
  @Post('logout')
  @HttpCode(204)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('Authorization', '', { maxAge: 0 });
    return;
  }
}

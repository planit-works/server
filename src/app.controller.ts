import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('api/healthcheck')
  @HttpCode(204)
  healthcheck() {
    return;
  }
}

import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('healthcheck')
  @HttpCode(204)
  healthcheck() {
    return;
  }
}

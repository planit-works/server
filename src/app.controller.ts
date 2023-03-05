import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiTags('App')
  @Get('api/healthcheck')
  @HttpCode(204)
  healthcheck() {
    return;
  }
}

import { Module } from '@nestjs/common';
import { TypeormConfigService } from './typeorm-config.service';

@Module({
  providers: [TypeormConfigService],
})
export class DbConfigModule {}

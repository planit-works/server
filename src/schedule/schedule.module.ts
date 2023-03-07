import { Module } from '@nestjs/common';
import { CreateScheduleService } from './services/create-schedule.service';
import { CreateScheduleController } from './controllers/create-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule, Schedule_User, Ymd } from '../entities';
import { CheckYmdRepository } from './outbound-adapter/check-ymd.repository';
import { CreateScheduleRepository } from './outbound-adapter/create-schedule.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Ymd, Schedule_User])],
  controllers: [CreateScheduleController],
  providers: [
    CreateScheduleService,
    CheckYmdRepository,
    CreateScheduleRepository,
  ],
})
export class ScheduleModule {}

import { Module } from '@nestjs/common';
import { CreateScheduleService } from './services/create-schedule.service';
import { CreateScheduleController } from './controllers/create-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../entities/schedule.entity';
import { Ymd } from '../entities/date.entity';
import { Schedule_User } from '../entities/schedule-user.entity';
import { CheckYmdRepository } from './outbound-adapter/check-ymd.repository';
import { CreateScheduleRepository } from './outbound-adapter/create-schedule.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, Ymd, Schedule_User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CreateScheduleController],
  providers: [
    CreateScheduleService,
    CheckYmdRepository,
    CreateScheduleRepository,
  ],
})
export class ScheduleModule {}

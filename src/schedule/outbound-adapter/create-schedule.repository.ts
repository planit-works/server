import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateScheduleOutboundPort,
  CreateScheduleOutboundPortInputDto,
} from '../outbound-port/create-schedule.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../../entities/schedule.entity';
import { Repository } from 'typeorm';
import { Schedule_User } from '../../entities/schedule-user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class CreateScheduleRepository implements CreateScheduleOutboundPort {
  constructor(
    @InjectRepository(Schedule) private schedule: Repository<Schedule>,
    @InjectRepository(Schedule_User)
    private scheduleUser: Repository<Schedule_User>,
    private connection: Connection,
  ) {}

  async execute(params: CreateScheduleOutboundPortInputDto): Promise<Schedule> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const { userId, ymdId } = params;
    let schedule = this.schedule.create(params);
    try {
      schedule = await queryRunner.manager.save(schedule);
      const scheduleUser = await this.scheduleUser.create({
        ymdId,
        userId,
        scheduleId: schedule.scheduleId,
      });
      await queryRunner.manager.save(scheduleUser);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('알 수 없는 에러');
    } finally {
      await queryRunner.release();
    }

    return schedule;
  }
}

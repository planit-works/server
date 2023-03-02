import { Schedule } from '../../entities/schedule.entity';

export interface CreateScheduleOutboundPortInputDto {
  ymdId: number;
  userId: number;
  title: string;
  description?: string;
  startAt?: string;
  endAt?: string;
}

export interface CreateScheduleOutboundPort {
  execute(params: CreateScheduleOutboundPortInputDto): Promise<Schedule>;
}

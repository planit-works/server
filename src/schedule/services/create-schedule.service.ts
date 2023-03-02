import { Inject, Injectable } from '@nestjs/common';
import {
  CreateScheduleInboundPort,
  CreateScheduleInboundPortInputDto,
  CreateScheduleInboundPortOutputDto,
} from '../inbound-port/create-schedule.inboud-port';
import { CreateScheduleOutboundPort } from '../outbound-port/create-schedule.outbound-port';
import { CreateScheduleRepository } from '../outbound-adapter/create-schedule.repository';
import { CheckYmdOutboundPort } from '../outbound-port/check-ymd.outbound-port';
import { CheckYmdRepository } from '../outbound-adapter/check-ymd.repository';

@Injectable()
export class CreateScheduleService implements CreateScheduleInboundPort {
  constructor(
    @Inject(CheckYmdRepository)
    private checkYmdOutboundPort: CheckYmdOutboundPort,
    @Inject(CreateScheduleRepository)
    private createScheduleRepository: CreateScheduleOutboundPort,
  ) {}

  async execute(
    params: CreateScheduleInboundPortInputDto,
  ): Promise<CreateScheduleInboundPortOutputDto> {
    const { ymd } = params;
    const { ymdId } = await this.checkYmdOutboundPort.execute(ymd);
    const { scheduleId } = await this.createScheduleRepository.execute({
      ...params,
      ymdId,
    });
    return { scheduleId };
  }
}

import { CreateScheduleService } from './create-schedule.service';
import { CheckYmdOutboundPort } from '../outbound-port/check-ymd.outbound-port';
import {
  CreateScheduleOutboundPort,
  CreateScheduleOutboundPortInputDto,
} from '../outbound-port/create-schedule.outbound-port';
import { Schedule } from '../../entities/schedule.entity';

class MockCheckYmdOutboundPort implements CheckYmdOutboundPort {
  async execute(ymd: string) {
    return Promise.resolve({ ymdId: 1 });
  }
}

class MockCreateScheduleOutboundPort implements CreateScheduleOutboundPort {
  async execute(params: CreateScheduleOutboundPortInputDto): Promise<Schedule> {
    return { ...params, scheduleId: 1, done: 0 };
  }
}

describe('CreateScheduleService', () => {
  let service: CreateScheduleService;

  beforeEach(async () => {
    service = new CreateScheduleService(
      new MockCheckYmdOutboundPort(),
      new MockCreateScheduleOutboundPort(),
    );
  });

  test('CreateScheduleService를 인스턴스로 생성할 수 있다.', () => {
    expect(service).toBeDefined();
  });

  test('정상적인 요청에 대해 스케쥴 ID를 반환한다.', async () => {
    const res = await service.execute({
      title: '미팅',
      userId: 1,
      ymd: '2023-10-02',
    });

    expect(res.scheduleId).toEqual(1);
  });
});

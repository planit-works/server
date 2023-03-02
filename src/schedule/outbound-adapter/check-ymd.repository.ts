import { Injectable } from '@nestjs/common';
import {
  CheckYmdOutboundPort,
  CheckYmdOutboundPortOutputDto,
} from '../outbound-port/check-ymd.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { Ymd } from '../../entities/date.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckYmdRepository implements CheckYmdOutboundPort {
  constructor(@InjectRepository(Ymd) private ymd: Repository<Ymd>) {}

  async execute(ymdString: string): Promise<CheckYmdOutboundPortOutputDto> {
    let ymd = await this.ymd.findOneBy({ ymd: ymdString });
    if (!ymd) {
      ymd = this.ymd.create({ ymd: ymdString });
      ymd = await this.ymd.save(ymd);
    }
    return ymd;
  }
}

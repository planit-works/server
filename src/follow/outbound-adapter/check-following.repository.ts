import { Injectable } from '@nestjs/common';
import {
  CheckFollowingOutboundPort,
  CheckFollowingOutboundPortInputDto,
} from '../outbound-port/check-following.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from '../../entities/follow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckFollowingRepository implements CheckFollowingOutboundPort {
  constructor(@InjectRepository(Follow) private follow: Repository<Follow>) {}

  async execute(params: CheckFollowingOutboundPortInputDto): Promise<boolean> {
    const { userId, followingId } = params;
    const follow = await this.follow.findBy({
      followerId: userId,
      followingId,
    });
    return follow.length === 1;
  }
}

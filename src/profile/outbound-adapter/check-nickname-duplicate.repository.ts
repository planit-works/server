import { Profile } from '../../entities/profile.entity';
import { Injectable } from '@nestjs/common';
import { CheckNicknameDuplicateOutboundPort } from '../outbound-port/check-nickname-duplicate.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CheckNicknameDuplicateRepository
  implements CheckNicknameDuplicateOutboundPort
{
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async execute(nickname: string): Promise<boolean> {
    return await this.profileRepository.exist({ where: { nickname } });
  }
}

import { Profile } from '../../entities/profile.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UpdateProfileOutboundPort,
  UpdateProfileOutboundPortInputDto,
} from '../outbound-port/update-profile.outbound-port';

@Injectable()
export class UpdateProfileRepository implements UpdateProfileOutboundPort {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async execute(params: UpdateProfileOutboundPortInputDto): Promise<void> {
    const { profileId, ...updateInfo } = params;
    const profile = await this.profileRepository.findOneBy({ profileId });
    Object.assign(profile, updateInfo);
    await this.profileRepository.save(profile);
    return;
  }
}

import { Profile } from './../entities/profile.entity';
import { IProfileRepository } from './types/profile.repository';
import { ProfileUpdateReqDto } from './dto/update-profile.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profile: Repository<Profile>,
  ) {}

  public create = async (): Promise<Profile> => {
    const profile = this.profile.create();
    const result = await this.profile.save(profile);
    return result;
  };

  public update = async (
    profileId: number,
    profileUpdateReqDto: ProfileUpdateReqDto,
  ): Promise<Profile> => {
    const profile = await this.profile.findOneBy({ id: profileId });
    Object.assign(profile, profileUpdateReqDto);
    await this.profile.save(profile);
    return;
  };
}

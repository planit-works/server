import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private readonly profile: Repository<Profile>,
  ) {}

  public create = async (): Promise<Profile> => {
    const profile = this.profile.create();
    const result = await this.profile.save(profile);
    return result;
  };
}

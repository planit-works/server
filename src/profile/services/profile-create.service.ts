import { ProfileRepository } from './../profile.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileCreateService {
  constructor(private profileRepository: ProfileRepository) {}

  create() {
    return this.profileRepository.create();
  }
}

import { ProfileUpdateReqDto } from './../dto/update-profile.dto';
import { ProfileRepository } from './../profile.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileUpdateService {
  constructor(private profileRepository: ProfileRepository) {}

  public update(profileId: number, profileUpdateReqDto: ProfileUpdateReqDto) {
    return this.profileRepository.update(profileId, profileUpdateReqDto);
  }
}

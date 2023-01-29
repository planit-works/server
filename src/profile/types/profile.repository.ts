import { Profile } from './../entities/profile.entity';
import { ProfileUpdateReqDto } from './../dto/update-profile.dto';

export class IProfileRepository {
  create: () => Promise<Profile>;
  update: (
    profileId: number,
    profileUpdateReqDto: ProfileUpdateReqDto,
  ) => Promise<Profile>;
}

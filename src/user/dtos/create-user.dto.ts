import { Profile } from './../../entities/profile.entity';
export interface CreateUserDto {
  email: string;
  password: string;
  profile: Profile;
  profileId: number;
}

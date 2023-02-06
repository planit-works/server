import { Profile } from '../../profile/entities/profile.entity';

export interface CreateUserDao {
  email: string;
  password: string;
  profile: Profile;
}

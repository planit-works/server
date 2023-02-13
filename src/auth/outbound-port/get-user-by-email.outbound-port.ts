import { Profile } from './../../profile/entities/profile.entity';

export type GetUserByEmailOutboundPortOutputDto = {
  id: number;
  email: string;
  password: string;
  profileId: number;
  profile: Profile;
};

export interface GetUserByEmailOutboundPort {
  execute(email: string): Promise<GetUserByEmailOutboundPortOutputDto>;
}

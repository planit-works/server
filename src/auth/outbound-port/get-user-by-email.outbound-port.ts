import { Profile } from '../../entities/profile.entity';

export interface GetUserByEmailOutboundPortOutputDto {
  userId: number;
  profileId: number;
  password: {
    password: string;
  };
  profile: Profile;
}

export interface GetUserByEmailOutboundPort {
  execute(email: string): Promise<GetUserByEmailOutboundPortOutputDto>;
}

import { Profile } from './../../profile/entities/profile.entity';

export interface SignupInboundPortInputDto {
  email: string;
  password: string;
}

export interface SignupInboundPortOutputDto {
  id: number;
  email: string;
  password: string;
  profileId: number;
  profile: Profile;
}

export interface SignupInboundPort {
  execute(
    params: SignupInboundPortInputDto,
  ): Promise<SignupInboundPortOutputDto>;
}

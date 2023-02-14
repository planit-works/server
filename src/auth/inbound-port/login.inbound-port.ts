import { Profile } from './../../entities/profile.entity';

export interface LoginInboundPortInputDto {
  email: string;
  password: string;
}

export interface LoginInboundPortOutputDto {
  id: number;
  email: string;
  password: string;
  profileId: number;
  profile: Profile;
}

export interface LoginInboundPort {
  execute(params: LoginInboundPortInputDto): Promise<LoginInboundPortOutputDto>;
}

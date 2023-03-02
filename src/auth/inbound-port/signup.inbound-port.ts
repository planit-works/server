import { Profile } from '../../entities/profile.entity';

export interface SignupInboundPortInputDto {
  email: string;
  password: string;
}

export interface SignupInboundPortOutputDto {
  userId: number;
  profileId: number;
  profile: {
    nickname: string;
    avatarUrl: string;
  };
}

export interface SignupInboundPort {
  execute(
    params: SignupInboundPortInputDto,
  ): Promise<SignupInboundPortOutputDto>;
}

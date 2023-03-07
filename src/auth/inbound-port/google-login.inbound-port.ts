import { LoginInboundPortOutputDto } from './login.inbound-port';

export interface GoogleLoginInboundPortInputDto {
  email: string;
  avatarUrl: string;
  refreshToken: string;
  provider: string;
}

export type GoogleLoginInboundPortOutputDto = LoginInboundPortOutputDto;

export interface GoogleLoginInboundPort {
  execute(
    params: GoogleLoginInboundPortInputDto,
  ): Promise<GoogleLoginInboundPortOutputDto>;
}

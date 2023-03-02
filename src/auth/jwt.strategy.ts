import { TokenPayload } from '../common/types/token-payload';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  GetUserByIdOutboundPort,
  GetUserByIdOutboundPortOutputDto,
} from './outbound-port/get-user-by-id.outbound-port';
import { GetUserByIdRepository } from './outbound-adapter/get-user-by-id.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GetUserByIdRepository)
    private getUserByIdRepository: GetUserByIdOutboundPort,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        function (req) {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['Authorization'];
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenPayload): Promise<TokenPayload> {
    const { userId } = payload;
    const user = await this.getUserByIdRepository.execute(userId);
    if (!user) {
      throw new UnauthorizedException('인증이 필요한 유저');
    }
    return payload;
  }
}

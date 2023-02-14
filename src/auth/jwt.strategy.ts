import { TokenPayload } from './types/token-payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
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

  async validate(payload: TokenPayload) {
    const { sub: userId } = payload;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('인증이 필요한 유저');
    }
    return user;
  }
}

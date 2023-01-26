import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user/entities/user.entity';
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

  async validate(payload) {
    console.log('페이로드');
    console.log(payload);
    const { userId } = payload;
    const user: User = await this.userRepository.findById(+userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

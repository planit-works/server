import { Module } from '@nestjs/common';
import {
  AuthSignupController,
  AuthLoginController,
  AuthLogoutController,
} from './controllers';
import { AuthSignupService, AuthLoginService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [
    AuthSignupController,
    AuthLoginController,
    AuthLogoutController,
  ],
  providers: [AuthSignupService, AuthLoginService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

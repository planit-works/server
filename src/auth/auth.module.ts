import { UserRepository } from './../user/user.repository';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import {
  AuthSignupController,
  AuthLoginController,
  AuthLogoutController,
} from './controllers';
import { AuthSignupService, AuthLoginService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthVerifyController } from './controllers/auth-verify.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [
    AuthSignupController,
    AuthLoginController,
    AuthLogoutController,
    AuthVerifyController,
  ],
  providers: [AuthSignupService, AuthLoginService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

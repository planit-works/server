import { User, Profile, Password, Image, Oauth } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import {
  SignupController,
  LoginController,
  AuthLogoutController,
  AuthVerifyController,
  GoogleLoginController,
} from './controllers';
import { SignupService, LoginService, GoogleLoginService } from './services';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';
import { CheckEmailDuplicateRepository } from './outbound-adapter/check-email-duplicate.repository';
import { GetUserByEmailRepository } from './outbound-adapter/get-user-by-email.repository';
import { CreateUserRepository } from './outbound-adapter/create-user.repository';
import { GetUserByIdRepository } from './outbound-adapter/get-user-by-id.repository';
import { CheckNicknameDuplicateRepository } from '../profile/outbound-adapter/check-nickname-duplicate.repository';
import { GoogleStrategy } from './utils/google.strategy';
import { CreateSocialUserRepository } from './outbound-adapter/create-social-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Password, Image, Oauth]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [
    SignupController,
    LoginController,
    AuthLogoutController,
    AuthVerifyController,
    GoogleLoginController,
  ],
  providers: [
    SignupService,
    LoginService,
    GetUserByIdRepository,
    GetUserByEmailRepository,
    CheckEmailDuplicateRepository,
    CreateUserRepository,
    JwtStrategy,
    JwtService,
    CheckNicknameDuplicateRepository,
    GoogleLoginService,
    GoogleStrategy,
    GoogleLoginService,
    CreateSocialUserRepository,
  ],
  exports: [],
})
export class AuthModule {}

import { GetUserByEmailRepository } from './outbound-adapter/get-user-by-email.outbound-adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './../user/user.repository';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import {
  AuthSignupController,
  LoginController,
  AuthLogoutController,
  AuthVerifyController,
} from './controllers';
import { AuthSignupService, LoginService } from './services';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    TypeOrmModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [
    AuthSignupController,
    LoginController,
    AuthLogoutController,
    AuthVerifyController,
  ],
  providers: [
    AuthSignupService,
    LoginService,
    UserRepository,
    GetUserByEmailRepository,
    JwtStrategy,
    JwtService,
  ],
  exports: [],
})
export class AuthModule {}

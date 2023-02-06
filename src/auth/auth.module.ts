import { ConfigService } from '@nestjs/config';
import { UserRepository } from './../user/user.repository';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import {
  AuthSignupController,
  AuthLoginController,
  AuthLogoutController,
} from './controllers';
import { AuthSignupService, AuthLoginService } from './services';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthVerifyController } from './controllers/auth-verify.controller';

@Module({
  imports: [
    UserModule,
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
    AuthLoginController,
    AuthLogoutController,
    AuthVerifyController,
  ],
  providers: [
    AuthSignupService,
    AuthLoginService,
    UserRepository,
    JwtStrategy,
    JwtService,
  ],
  exports: [],
})
export class AuthModule {}

import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AppController } from './app.controller';
import * as cookieParser from 'cookie-parser';
import { FollowModule } from './follow/follow.module';
import { DbConfigModule } from './config/db-config.module';
import { TypeormConfigService } from './config/typeorm-config.service';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DbConfigModule],
      useClass: TypeormConfigService,
      inject: [TypeormConfigService],
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    FollowModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}

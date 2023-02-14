import { User } from './../entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { ProfileModule } from './../profile/profile.module';
// import { GetUserInterceptor } from './interceptors/get-user.interceptor';
import { UserFindByEmailService } from './services/user-find-by-email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core'; // 전역적으로 적용할 경우 성능을 저하 및 overfetching을 유발한다.

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ProfileModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [],
  providers: [UserFindByEmailService, UserRepository],
  exports: [
    TypeOrmModule,
    UserFindByEmailService,
    UserRepository,
    // { provide: APP_INTERCEPTOR, useClass: GetUserInterceptor },
  ],
})
export class UserModule {}

import { Profile } from './../profile/entities/profile.entity';
import { ProfileModule } from './../profile/profile.module';
// import { GetUserInterceptor } from './interceptors/get-user.interceptor';
import { UserFindByEmailService } from './services/user-find-by-email.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCreateService } from './services/user-create.service';
import { Module } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core'; // 전역적으로 적용할 경우 성능을 저하 및 overfetching을 유발한다.

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), ProfileModule],
  controllers: [],
  providers: [UserCreateService, UserFindByEmailService, UserRepository],
  exports: [
    UserCreateService,
    UserFindByEmailService,
    // { provide: APP_INTERCEPTOR, useClass: GetUserInterceptor },
  ],
})
export class UserModule {}

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SearchUsersByNicknameController } from './controllers/search-users-by-nickname.controller';
import { SearchUsersByNicknameService } from './services/search-users-by-nickname.service';
import { SearchUsersByNicknameRepository } from './outbound-adapter/search-users-by-nickname.repository';
import { CheckFollowingRepository } from './outbound-adapter/check-following.repository';
import { Follow, Profile, User } from '../entities';
import { SearchUsersTotalCountRepository } from './outbound-adapter/search-users-total-count.repository';
// import { APP_INTERCEPTOR } from '@nestjs/core'; // 전역적으로 적용할 경우 성능을 저하 및 overfetching을 유발한다.
// import { GetUserInterceptor } from './interceptors/get-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User, Follow, Profile])],
  controllers: [SearchUsersByNicknameController],
  providers: [
    SearchUsersByNicknameService,
    SearchUsersByNicknameRepository,
    CheckFollowingRepository,
    SearchUsersTotalCountRepository,
  ],
})
export class UserModule {}

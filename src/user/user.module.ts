import { User } from '../entities/user.entity';
import { PassportModule } from '@nestjs/passport';
// import { GetUserInterceptor } from './interceptors/get-user.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core'; // 전역적으로 적용할 경우 성능을 저하 및 overfetching을 유발한다.
import { SearchUsersByEmailController } from './controllers/search-users-by-email.controller';
import { SearchUsersByEmailService } from './services/search-users-by-email.service';
import { SearchUsersByEmailRepository } from './outbound-adapter/search-users-by-email.repository';
import { CheckFollowingRepository } from './outbound-adapter/check-following.repository';
import { Follow } from '../entities/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SearchUsersByEmailController],
  providers: [
    SearchUsersByEmailService,
    SearchUsersByEmailRepository,
    CheckFollowingRepository,
  ],
})
export class UserModule {}

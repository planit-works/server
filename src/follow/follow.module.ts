import { Module } from '@nestjs/common';
import { FollowController } from './controllers/follow.controller';
import { FollowService } from './services/follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from '../entities/follow.entity';
import { FollowRepository } from './outbound-adapter/follow.repository';
import { CheckUserExistRepository } from './outbound-adapter/check-user-exist.repository';
import { User } from '../entities/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follow, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [FollowController],
  providers: [FollowService, FollowRepository, CheckUserExistRepository],
  exports: [],
})
export class FollowModule {}

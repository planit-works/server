import { Module } from '@nestjs/common';
import { FollowUserController } from './controllers/follow-user.controller';
import { FollowUserService } from './services/follow-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Follow } from '../entities/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User])],
  controllers: [FollowUserController],
  providers: [FollowUserService],
  exports: [],
})
export class FollowModule {}

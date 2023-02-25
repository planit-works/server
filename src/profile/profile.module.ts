import { Profile } from '../entities/profile.entity';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UpdateProfileController } from './controllers/update-profile.controller';
import { UpdateProfileService } from './services/update-profile.service';
import { UpdateProfileRepository } from './outbound-adapter/update-profile.repository';
import { GetProfileByUserIdController } from './controllers/get-profile-by-user-id.controller';
import { GetProfileByUserIdService } from './services/get-profile-by-user-id.service';
import { User } from '../entities/user.entity';
import { Follow } from '../entities/follow.entity';
import { GetProfileByUserIdRepository } from './outbound-adapter/get-profile-by-user-id.repository';
import { GetFollowCountRepository } from './outbound-adapter/get-follow-count.repository';
import { CheckNicknameDuplicateRepository } from './outbound-adapter/check-nickname-duplicate.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User, Follow]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UpdateProfileController, GetProfileByUserIdController],
  providers: [
    UpdateProfileService,
    UpdateProfileRepository,
    GetProfileByUserIdService,
    GetProfileByUserIdRepository,
    GetFollowCountRepository,
    CheckNicknameDuplicateRepository,
  ],
  exports: [CheckNicknameDuplicateRepository],
})
export class ProfileModule {}

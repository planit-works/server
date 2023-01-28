import { ProfileRepository } from './profile.repository';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProfileCreateService } from './services/profile-create.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [],
  providers: [ProfileCreateService, ProfileRepository],
  exports: [ProfileCreateService],
})
export class ProfileModule {}

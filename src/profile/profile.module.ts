import { PassportModule } from '@nestjs/passport';
import { ProfileRepository } from './profile.repository';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProfileCreateService } from './services/profile-create.service';
import { ProfileUpdateController } from './controllers/profile-update.controller';
import { ProfileUpdateService } from './services/profile-update.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProfileUpdateController],
  providers: [ProfileCreateService, ProfileUpdateService, ProfileRepository],
  exports: [TypeOrmModule, ProfileCreateService],
})
export class ProfileModule {}

import { Profile } from './../entities/profile.entity';
import { PassportModule } from '@nestjs/passport';
import { ProfileRepository } from './profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProfileUpdateController } from './controllers/profile-update.controller';
import { ProfileUpdateService } from './services/profile-update.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProfileUpdateController],
  providers: [ProfileUpdateService, ProfileRepository],
  exports: [TypeOrmModule],
})
export class ProfileModule {}

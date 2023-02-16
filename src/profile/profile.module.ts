import { Profile } from '../entities/profile.entity';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UpdateProfileController } from './controllers/update-profile.controller';
import { UpdateProfileService } from './services/update-profile.service';
import { UpdateProfileRepository } from './outbound-adapter/update-profile.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UpdateProfileController],
  providers: [UpdateProfileService, UpdateProfileRepository],
  exports: [TypeOrmModule],
})
export class ProfileModule {}

import { User } from './../../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ProfileUpdateReqDto } from './../dto/update-profile.dto';
import { ProfileUpdateService } from './../services/profile-update.service';
import { Controller, Patch, HttpCode, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('users')
export class ProfileUpdateController {
  constructor(private profileUpdateService: ProfileUpdateService) {}

  @ApiOperation({ summary: '프로필 업데이트' })
  @ApiResponse({ status: 204, description: '프로필 업데이트 성공' })
  @Patch('profile')
  @UseGuards(AuthGuard())
  @HttpCode(204)
  updateProfile(
    @CurrentUser('user') currentUser: User,
    @Body() profileUpdateReqDto: ProfileUpdateReqDto,
  ) {
    const profileId = currentUser.profileId;
    return this.profileUpdateService.update(profileId, profileUpdateReqDto);
  }
}

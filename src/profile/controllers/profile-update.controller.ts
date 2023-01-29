import { AuthGuard } from '@nestjs/passport';
import { CookieUserInfo } from '../../common/types/cookie-user';
import { ProfileUpdateReqDto } from './../dto/update-profile.dto';
import { ProfileUpdateService } from './../services/profile-update.service';
import { Controller, Patch, HttpCode, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Cookies } from '../../common/decorators/get-user.decorator';

@Controller('users')
export class ProfileUpdateController {
  constructor(private profileUpdateService: ProfileUpdateService) {}

  @ApiOperation({ summary: '프로필 업데이트' })
  @ApiResponse({ status: 204, description: '프로필 업데이트 성공' })
  @Patch('profile')
  @UseGuards(AuthGuard())
  @HttpCode(204)
  updateProfile(
    @Body() profileUpdateReqDto: ProfileUpdateReqDto,
    @Cookies('user') user: CookieUserInfo,
  ) {
    const profileId = user.profileId;
    return this.profileUpdateService.update(profileId, profileUpdateReqDto);
  }
}

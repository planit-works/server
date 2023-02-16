import { User } from '../../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileReqDto } from '../dtos/update-profile.req.dto';
import { UpdateProfileService } from '../services/update-profile.service';
import {
  Controller,
  Patch,
  HttpCode,
  Body,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UpdateProfileInboundPort } from '../inbound-port/update-profile.inbound-port';
import { checkEmptyBody } from '../../common/utils/checkEmptyBody';

@Controller('users')
export class UpdateProfileController {
  constructor(
    @Inject(UpdateProfileService)
    private updateProfileService: UpdateProfileInboundPort,
  ) {}

  @ApiOperation({ summary: '프로필 업데이트' })
  @ApiResponse({ status: 204, description: '프로필 업데이트 성공' })
  @Patch('profile')
  @UseGuards(AuthGuard())
  @HttpCode(204)
  updateProfile(
    @CurrentUser('user') currentUser: User,
    @Body() updateProfileReqDto: UpdateProfileReqDto,
  ) {
    checkEmptyBody(updateProfileReqDto);
    const { profileId } = currentUser;
    return this.updateProfileService.execute({
      profileId,
      ...updateProfileReqDto,
    });
  }
}

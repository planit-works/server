import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { GetProfileByUserIdService } from '../services/get-profile-by-user-id.service';
import { GetProfileByUserIdInboundPort } from '../inbound-port/get-profile-by-user-id.inbound-port';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
import { GetProfileByUserIdReqDto } from '../dtos/get-profile-by-user-id.req.dto';

@Controller('profiles')
export class GetProfileByUserIdController {
  constructor(
    @Inject(GetProfileByUserIdService)
    private getProfileByUserIdInboundPort: GetProfileByUserIdInboundPort,
  ) {}

  @ApiOperation({ summary: '프로필 정보 조회' })
  @ApiResponse({ status: 204, description: '프로필 조회 성공' })
  @Get()
  @UseGuards(AuthGuard())
  @HttpCode(200)
  getProfileByUserId(
    @CurrentUser('user') currentUser: User,
    @Body() body: GetProfileByUserIdReqDto,
  ) {
    const currentUserId = currentUser.id;
    const { userId } = body;
    return this.getProfileByUserIdInboundPort.execute({
      currentUserId,
      userId,
    });
  }
}

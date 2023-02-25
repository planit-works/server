import { FollowInboundPort } from '../inbound-port/follow.inbount-port';
import {
  Controller,
  Post,
  HttpCode,
  Inject,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from '../services/follow.service';
import { FollowReqDto } from '../dtos/follow.req.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/follow')
export class FollowController {
  constructor(
    @Inject(FollowService) private followInboundPort: FollowInboundPort,
  ) {}

  @ApiOperation({ summary: '팔로우' })
  @ApiResponse({ status: 204, description: '팔로우 성공' })
  @Post()
  @UseGuards(AuthGuard())
  @HttpCode(204)
  async follow(
    @CurrentUser('user') currentUser: User,
    @Body() followReqDto: FollowReqDto,
  ): Promise<void> {
    return this.followInboundPort.execute({
      followerId: currentUser.id,
      followingId: followReqDto.followingId,
    });
  }
}

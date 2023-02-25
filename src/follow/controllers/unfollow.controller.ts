import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { UnfollowService } from '../services/unfollow.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
import { UnfollowReqDto } from '../dtos/unfollow.req.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnfollowInboundPort } from '../inbound-port/unfollow.inbound-port';

@Controller('api/follow')
export class UnfollowController {
  constructor(
    @Inject(UnfollowService) private unfollowInboundPort: UnfollowInboundPort,
  ) {}

  @ApiOperation({ summary: '언팔로우' })
  @ApiResponse({ status: 204, description: '언팔로우 성공' })
  @Delete()
  @UseGuards(AuthGuard())
  @HttpCode(204)
  async unfollow(
    @CurrentUser('user') currentUser: User,
    @Body() unfollowReqDto: UnfollowReqDto,
  ): Promise<void> {
    const unfollowerId = currentUser.id;
    const { unfollowingId } = unfollowReqDto;
    return this.unfollowInboundPort.execute({ unfollowerId, unfollowingId });
  }
}

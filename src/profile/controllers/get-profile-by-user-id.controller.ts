import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetProfileByUserIdService } from '../services/get-profile-by-user-id.service';
import {
  GetProfileByUserIdInboundPort,
  GetProfileByUserIdInboundPortOutputDto,
} from '../inbound-port/get-profile-by-user-id.inbound-port';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { GetProfileByUserIdReqDto } from '../dtos/get-profile-by-user-id.req.dto';
import { GetProfileByUserIdResDto } from '../dtos/get-profile-by-user-id.res.dto';
import { TokenPayload } from '../../common/types/token-payload';

@Controller('api/profiles')
export class GetProfileByUserIdController {
  constructor(
    @Inject(GetProfileByUserIdService)
    private getProfileByUserIdInboundPort: GetProfileByUserIdInboundPort,
  ) {}

  @ApiOperation({ summary: '프로필 정보 조회' })
  @ApiResponse({
    status: 200,
    description: '프로필 조회 성공',
    type: GetProfileByUserIdResDto,
  })
  @ApiTags('Profile')
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  getProfileByUserId(
    @CurrentUser('user') currentUser: TokenPayload,
    @Body() body: GetProfileByUserIdReqDto,
  ): Promise<GetProfileByUserIdInboundPortOutputDto> {
    const currentUserId = currentUser.userId;
    const { userId } = body;
    return this.getProfileByUserIdInboundPort.execute({
      currentUserId,
      userId,
    });
  }
}

import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SearchUsersByNicknameService } from '../services/search-users-by-nickname.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import {
  SearchUsersByNicknameInboundPort,
  SearchUsersByNicknameInboundPortOutputDto,
} from '../inbound-port/search-users-by-nickname.inbound-port';
import { SearchUsersByEmailReqQueryDto } from '../dtos/search-users-by-email.req.query.dto';
import { TokenPayload } from '../../common/types/token-payload';

@Controller('api/users')
export class SearchUsersByNicknameController {
  constructor(
    @Inject(SearchUsersByNicknameService)
    private searchUsersByEmailInboundPort: SearchUsersByNicknameInboundPort,
  ) {}

  @ApiOperation({
    summary: '닉네임으로 유저 검색',
  })
  @ApiResponse({ status: 200, description: '검색 성공' })
  @ApiTags('User')
  @Get()
  @UseGuards(AuthGuard())
  @HttpCode(200)
  async searchUsersByNickname(
    @CurrentUser('user') currentUser: TokenPayload,
    @Query() query: SearchUsersByEmailReqQueryDto,
  ): Promise<SearchUsersByNicknameInboundPortOutputDto[]> {
    const { q: nickname } = query;
    return this.searchUsersByEmailInboundPort.execute({
      userId: currentUser.userId,
      nickname,
    });
  }
}

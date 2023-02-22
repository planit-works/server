import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SearchUsersByEmailService } from '../services/search-users-by-email.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
import {
  SearchUsersByEmailInboundPort,
  SearchUsersByEmailInboundPortOutputDto,
} from '../inbound-port/search-users-by-email.inbound-port';
import { SearchUsersByEmailReqQueryDto } from '../dtos/search-users-by-email.req.query.dto';

@Controller('api/users')
export class SearchUsersByEmailController {
  constructor(
    @Inject(SearchUsersByEmailService)
    private searchUsersByEmailInboundPort: SearchUsersByEmailInboundPort,
  ) {}

  @ApiOperation({
    summary: '이메일로 유저 검색',
  })
  @ApiResponse({ status: 200, description: '검색 성공' })
  @Get()
  @UseGuards(AuthGuard())
  @HttpCode(200)
  async searchUsersByEmail(
    @CurrentUser('user') currentUser: User,
    @Query() query: SearchUsersByEmailReqQueryDto,
  ): Promise<SearchUsersByEmailInboundPortOutputDto[]> {
    const { q: email } = query;
    return this.searchUsersByEmailInboundPort.execute({
      userId: currentUser.id,
      email,
    });
  }
}

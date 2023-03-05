import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateScheduleService } from '../services/create-schedule.service';
import {
  CreateScheduleInboundPort,
  CreateScheduleInboundPortOutputDto,
} from '../inbound-port/create-schedule.inboud-port';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateScheduleReqDto } from '../dtos/create-schedule.req.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from '../../common/types/token-payload';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('api/schedules')
export class CreateScheduleController {
  constructor(
    @Inject(CreateScheduleService)
    private createScheduleInboundPort: CreateScheduleInboundPort,
  ) {}

  @ApiOperation({ summary: '스케줄 생성' })
  @ApiResponse({ status: 201 })
  @ApiTags('Schedule')
  @UseGuards(AuthGuard())
  @Post()
  async createSchedule(
    @Body() body: CreateScheduleReqDto,
    @CurrentUser('user') currentUser: TokenPayload,
  ): Promise<CreateScheduleInboundPortOutputDto> {
    const { year, month, day, ...rest } = body;
    return await this.createScheduleInboundPort.execute({
      ...rest,
      userId: currentUser.userId,
      ymd: `${year}${month}${day}`,
    });
  }
}

import { CurrentUser } from './../../common/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/entities/user.entity';
import { UpsertTodoService } from '../services/upsert-todo.service';
import {
  Controller,
  Body,
  ValidationPipe,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpsertTodoReqDto } from '../dtos/upsert-todo.req.dto';

@Controller('todos')
export class UpsertTodoController {
  constructor(private readonly createTodoService: UpsertTodoService) {}

  @ApiOperation({ summary: 'To-do 등록' })
  @ApiResponse({ status: 204, description: '회원가입 성공' })
  @Put()
  @UseGuards(AuthGuard())
  @HttpCode(204)
  async signup(
    @CurrentUser('user') currentUser: User,
    @Body(new ValidationPipe()) upsertTodoReqDto: UpsertTodoReqDto,
  ) {
    console.log(currentUser);
    console.log(upsertTodoReqDto);
    const result = await this.createTodoService.upsertTodo({
      userId: currentUser.id,
      ...upsertTodoReqDto,
    });
    return result;
  }
}

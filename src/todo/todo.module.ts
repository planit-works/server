import { PassportModule } from '@nestjs/passport';
import { TodoRepository } from './todo.repository';
import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UpsertTodoController } from './controllers/upsert-todo.controller';
import { UpsertTodoService } from './services/upsert-todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UpsertTodoController],
  providers: [UpsertTodoService, TodoRepository],
  exports: [TypeOrmModule],
})
export class TodoModule {}

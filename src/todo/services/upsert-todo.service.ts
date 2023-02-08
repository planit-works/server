import { UpsertTodoDto } from '../dtos/upsert-todo.dto';
import { TodoRepository } from '../todo.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpsertTodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  public upsertTodo = async (upsertTodoDto: UpsertTodoDto) => {
    const result = await this.todoRepository.upsert(upsertTodoDto);
    console.log(result);
    return result;
  };
}

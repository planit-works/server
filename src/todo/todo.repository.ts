import { UpsertTodoDao } from './daos/upsert-todo.dao';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { ITodoRepository } from './types/todo.repository';

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todo: Repository<Todo>,
  ) {}

  public upsert = async (
    upsertTodoDao: UpsertTodoDao,
  ): Promise<InsertResult> => {
    const result = await this.todo.upsert(upsertTodoDao, {
      conflictPaths: {
        userId: true,
        date: true,
        title: true,
      },
      skipUpdateIfNoValuesChanged: true,
    });
    return result;
  };
}

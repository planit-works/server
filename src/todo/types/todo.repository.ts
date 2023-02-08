import { InsertResult } from 'typeorm';
import { UpsertTodoDao } from '../daos/upsert-todo.dao';

export class ITodoRepository {
  upsert: (createTodoDao: UpsertTodoDao) => Promise<InsertResult>;
}

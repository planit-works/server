import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryColumn()
  date: string;

  @PrimaryColumn()
  userId: number;

  @Column({ type: 'text' })
  todos: string;
}

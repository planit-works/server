import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryColumn()
  date: string;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn({ type: 'varchar' })
  title: string;

  @Column({ type: 'boolean' })
  done: boolean;
}

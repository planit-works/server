import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'routine' })
export class Routine {
  @PrimaryGeneratedColumn()
  routineId: number;

  @Column()
  userId: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  description: string;

  @Column({ type: 'char', length: 4, nullable: false })
  startAt: string;

  @Column({ type: 'char', length: 4, nullable: false })
  endAt: string;

  @Column({ type: 'bit', default: 0 })
  done: number;

  @ManyToOne(() => User, { cascade: ['soft-remove'] })
  @JoinColumn({ name: 'userId' })
  user: User;
}

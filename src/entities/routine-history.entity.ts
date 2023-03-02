import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ymd } from './date.entity';
import { Routine } from './routine.entity';

@Entity({ name: 'routine_history' })
export class RoutineHistory {
  @PrimaryGeneratedColumn()
  routineHistoryId: number;

  @Column()
  routineId: number;

  @Column()
  ymdId: number;

  @Column({ type: 'bit', default: 0 })
  done: number;

  @OneToOne(() => Ymd)
  @JoinColumn({ name: 'ymdId' })
  ymd: Ymd;

  @ManyToOne(() => Routine, { cascade: ['soft-remove'] })
  @JoinColumn({ name: 'routineId' })
  routine: Routine;
}

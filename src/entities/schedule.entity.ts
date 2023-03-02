import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ymd } from './date.entity';

@Entity({ name: 'schedule' })
export class Schedule {
  @PrimaryGeneratedColumn()
  scheduleId: number;

  @Column()
  ymdId: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'char', length: 4, nullable: true })
  startAt?: string;

  @Column({ type: 'char', length: 4, nullable: true })
  endAt?: string;

  @Column({ type: 'bit', default: 0 })
  done: number;

  @OneToOne(() => Ymd)
  @JoinColumn({ name: 'ymdId' })
  ymd?: Ymd;
}

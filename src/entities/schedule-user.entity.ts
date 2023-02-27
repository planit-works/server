import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Schedule } from './schedule.entity';
import { Ymd } from './date.entity';

@Entity({ name: 'schedule_user' })
export class Schedule_User {
  @PrimaryGeneratedColumn()
  scheduleUserId: number;

  @Column()
  scheduleId: number;

  @Column()
  userId: number;

  @Column()
  ymdId: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, { cascade: ['soft-remove'] })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'scheduleId' })
  schedule: Schedule;

  @ManyToOne(() => Ymd)
  @JoinColumn({ name: 'ymdId' })
  ymd: Ymd;
}

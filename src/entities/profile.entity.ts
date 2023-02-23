import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Index()
  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar', default: 'avatars/default' })
  avatarUrl: string;

  @OneToOne(() => User)
  @JoinColumn()
  user?: User;
}

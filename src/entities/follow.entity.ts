import { User } from './user.entity';
import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  follwerId: number;

  @Column()
  followingId: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => User, (user) => user.follower)
  follower: User;

  @ManyToOne(() => User, (user) => user.following)
  following: User;
}

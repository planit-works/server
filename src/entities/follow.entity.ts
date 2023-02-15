import { User } from './user.entity';
import { Entity, CreateDateColumn, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class Follow {
  @PrimaryColumn()
  followerId: number;

  @PrimaryColumn()
  followingId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.following)
  following: User;

  @ManyToOne(() => User, (user) => user.followers)
  follower: User;
}

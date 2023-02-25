import { Profile } from './profile.entity';
import { Follow } from './follow.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  profileId: number;

  @CreateDateColumn()
  createdAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Follow, (follow) => follow.following)
  following?: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  followers?: Follow[];
}

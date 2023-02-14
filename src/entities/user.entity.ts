import { Profile } from './profile.entity';
import { Follow } from './follow.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @Column()
  profileId: number;

  @OneToMany(() => Follow, (follow) => follow.follower)
  follower?: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  following?: Follow[];
}

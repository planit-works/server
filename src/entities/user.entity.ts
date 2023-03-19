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
import { Password } from './password.entity';
import { Oauth } from './oauth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  profileId: number;

  @Column({ default: 2 })
  roleId?: number;

  @Index()
  @Column()
  email: string;

  @CreateDateColumn()
  createdAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @OneToOne(() => Password, (password) => password.user)
  password?: Password;

  @OneToOne(() => Oauth, (oauth) => oauth.user)
  oauth?: Oauth;

  @OneToMany(() => Follow, (follow) => follow.following)
  following?: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  followers?: Follow[];
}

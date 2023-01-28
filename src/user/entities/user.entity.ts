import { Profile } from './../../profile/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, { eager: true })
  @JoinColumn()
  profile: Profile;
}
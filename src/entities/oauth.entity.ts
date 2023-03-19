import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

enum OauthProvider {
  GOOGLE = 'google',
  KAKAO = 'kakao',
}

@Entity({ name: 'oauth' })
export class Oauth {
  @PrimaryGeneratedColumn()
  oauthId: number;

  @Column()
  userId?: number;

  @OneToOne(() => User, (user) => user.oauth)
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ enum: [OauthProvider.GOOGLE, OauthProvider.KAKAO] })
  provider: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum OauthProvider {
  GOOGLE = 'google',
  KAKAO = 'kakao',
}

@Entity({ name: 'oauth' })
export class Oauth {
  @PrimaryGeneratedColumn()
  oauthId: number;

  @Column({ enum: [OauthProvider.GOOGLE, OauthProvider.KAKAO] })
  provider: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string;
}

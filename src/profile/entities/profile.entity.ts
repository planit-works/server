import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ dafault: '익명의 사용자' })
  nickname: string;

  @Column({ default: 'avatar/testurl' })
  avatarUrl: string;
}

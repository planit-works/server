import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity({ name: 'image' })
export class Image {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  url: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @OneToOne(() => Profile, { cascade: ['soft-remove'] })
  profile?: Profile;
}

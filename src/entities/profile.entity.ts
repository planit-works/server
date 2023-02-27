import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @Column({ default: 1 })
  @JoinColumn()
  imageId: number;

  @Index()
  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'imageId' })
  image: Image;

  @OneToOne(() => User, (user) => user.profile, {
    cascade: ['soft-remove'],
    eager: true,
  })
  user?: User;
}

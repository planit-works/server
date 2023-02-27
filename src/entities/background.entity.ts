import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Image } from './image.entity';

@Entity({ name: 'background' })
export class Background {
  @PrimaryGeneratedColumn()
  backgroundId: number;

  @Column()
  @JoinColumn()
  userId: number;

  @Column()
  @JoinColumn()
  imageId: number;

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => Image, { eager: true, cascade: ['remove'] })
  image: Image;
}

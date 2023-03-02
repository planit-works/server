import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'password' })
export class Password {
  @PrimaryGeneratedColumn()
  passwordId?: number;

  @Column()
  userId?: number;

  @OneToOne(() => User, (user) => user.password)
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @UpdateDateColumn({})
  updatedAt?: Date;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ymd' })
export class Ymd {
  @PrimaryGeneratedColumn()
  ymdId: number;

  @Column({ type: 'char', length: 8, nullable: false })
  ymd: string;
}

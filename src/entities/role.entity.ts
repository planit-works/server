import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  BASIC = 'basic',
}

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({
    type: 'varchar',
    length: 20,
    enum: [UserRole.ADMIN, UserRole.BASIC],
  })
  role: string;
}

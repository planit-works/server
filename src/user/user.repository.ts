import { CreateUserDao } from './daos/create-user.dao';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUserRepository } from './types/user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  public create = async (createUserDao: CreateUserDao): Promise<User> => {
    const { email, password } = createUserDao;
    const user = this.user.create({ email, password });

    user.profile = createUserDao.profile;

    const result = await this.user.save(user);
    return result;
  };

  public findById = async (id: number) => {
    const user = await this.user.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
    return user;
  };

  public findByEmail = async (email: string) => {
    const user = await this.user.findOne({
      where: { email },
      relations: { profile: true },
    });
    return user;
  };
}

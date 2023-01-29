import { CreateUserDto } from './dto/create-user.dto';
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

  public create = async (createUserDto: CreateUserDto): Promise<User> => {
    const user = this.user.create(createUserDto);
    const result = await this.user.save(user);
    return result;
  };

  public findById = async (id: number) => {
    const user = this.user.findOneBy({ id });
    return user;
  };

  public findByEmail = async (email: string) => {
    const user = this.user.findOneBy({ email });
    return user;
  };
}

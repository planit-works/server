import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupReqDto, LoginResDto } from '../auth/dtos';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignUpSuccessResult } from '../auth/types/signup-success-result';
import { IUserRepository } from './types/user-repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  public create = async (signupDto: SignupReqDto): Promise<User> => {
    const user = this.user.create(signupDto);
    let result: SignUpSuccessResult;
    try {
      result = await this.user.save(user);
    } catch (error) {
      if (error['code'] === '23505') {
        throw new ConflictException('존재하는 이메일');
      }
    }
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

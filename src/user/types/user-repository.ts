import { SignupReqDto, LoginResDto } from '../../auth/dtos';
import { User } from '../entities/user.entity';

export class IUserRepository {
  create: (signupDto: SignupReqDto) => Promise<LoginResDto>;
  findById: (id: number) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
}

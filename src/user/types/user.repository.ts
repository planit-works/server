import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export class IUserRepository {
  create: (signupDto: CreateUserDto) => Promise<User>;
  findById: (id: number) => Promise<User>;
  findByEmail: (email: string) => Promise<User>;
}

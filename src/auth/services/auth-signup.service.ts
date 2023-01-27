import { UserFindByEmailService } from './../../user/services/user-find-by-email.service';
import { User } from './../../user/entities/user.entity';
import { UserCreateService } from './../../user/services/user-create.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupReqDto } from '../dtos';

@Injectable()
export class AuthSignupService {
  constructor(
    private userCreateService: UserCreateService,
    private userFindByEmailService: UserFindByEmailService,
  ) {}

  public signup = async (signupDto: SignupReqDto): Promise<User> => {
    const { email, password } = signupDto;

    const user = await this.userFindByEmailService.findByEmail(email);

    if (user) {
      throw new BadRequestException('사용 중인 이메일');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    return this.userCreateService.create({
      ...signupDto,
      password: hashedPassword,
    });
  };
}

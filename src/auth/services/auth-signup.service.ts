import { UserCreateService } from './../../user/services/user-create.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupReqDto, LoginResDto } from '../dtos';

@Injectable()
export class AuthSignupService {
  constructor(private userCreateService: UserCreateService) {}

  public signup = async (signupDto: SignupReqDto): Promise<LoginResDto> => {
    const { email, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 12);
    return this.userCreateService.create({
      ...signupDto,
      password: hashedPassword,
    });
  };
}

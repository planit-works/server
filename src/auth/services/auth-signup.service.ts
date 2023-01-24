import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user.repository';
import { SignupReqDto, LoginResDto } from '../dtos';

@Injectable()
export class AuthSignupService {
  constructor(private userRepository: UserRepository) {}

  public signup = async (signupDto: SignupReqDto): Promise<LoginResDto> => {
    const { password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 12);
    return this.userRepository.create({
      ...signupDto,
      password: hashedPassword,
    });
  };
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user.repository';
import { LoginReqDto } from '../dtos';

@Injectable()
export class AuthLoginService {
  constructor(private userRepository: UserRepository) {}

  public login = async (loginDto: LoginReqDto) => {
    const { email, password } = loginDto;
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('이메일/비밀번호 재확인');
    }
    return user.id;
  };
}

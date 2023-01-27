import { UserFindByEmailService } from '../../user/services/user-find-by-email.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginReqDto } from '../dtos';

@Injectable()
export class AuthLoginService {
  constructor(private userFindByEmailService: UserFindByEmailService) {}

  public login = async (loginDto: LoginReqDto) => {
    const { email, password } = loginDto;
    const user = await this.userFindByEmailService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('이메일/비밀번호 재확인');
    }
    return user.id;
  };
}

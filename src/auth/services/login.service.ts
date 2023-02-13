import { GetUserByEmailRepository } from './../outbound-adapter/get-user-by-email.outbound-adapter';
import { GetUserByEmailOutboundPort } from './../outbound-port/get-user-by-email.outbound-port';
import {
  LoginInboundPort,
  LoginInboundPortInputDto,
  LoginInboundPortOutputDto,
} from './../inbound-port/login.inbound-port';
import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService implements LoginInboundPort {
  constructor(
    @Inject(GetUserByEmailRepository)
    private getUserByEamilOutboundPort: GetUserByEmailOutboundPort,
  ) {}

  async execute(
    params: LoginInboundPortInputDto,
  ): Promise<LoginInboundPortOutputDto> {
    const { email, password } = params;
    const user = await this.getUserByEamilOutboundPort.execute(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('이메일/비밀번호 재확인');
    }
    return user;
  }
}

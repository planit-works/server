import { Injectable, ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserOutboundPort } from '../outbound-port/create-user.outbound-port';
import { CheckEmailDuplicateOutboundPort } from '../outbound-port/check-email-duplicate.outbound-port';
import { CreateUserRepository } from '../outbound-adapter/create-user.repository';
import { CheckEmailDuplicateRepository } from '../outbound-adapter/check-email-duplicate.repository';
import {
  SignupInboundPort,
  SignupInboundPortInputDto,
  SignupInboundPortOutputDto,
} from '../inbound-port/signup.inbound-port';

@Injectable()
export class SignupService implements SignupInboundPort {
  constructor(
    @Inject(CheckEmailDuplicateRepository)
    private checkEmailDuplicateOutboundPort: CheckEmailDuplicateOutboundPort,
    @Inject(CreateUserRepository)
    private createUserOutboundPort: CreateUserOutboundPort,
  ) {}

  async execute(
    params: SignupInboundPortInputDto,
  ): Promise<SignupInboundPortOutputDto> {
    const { email, password } = params;
    const isEmailDuplicate = await this.checkEmailDuplicateOutboundPort.execute(
      email,
    );
    if (isEmailDuplicate) {
      throw new ConflictException('가입된 이메일');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.createUserOutboundPort.execute({
      email,
      password: hashedPassword,
    });

    return user;
  }
}

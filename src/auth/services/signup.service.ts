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
import { createRandomNickname } from '../utils/create-random-nickname';
import { CheckNicknameDuplicateOutboundPort } from '../../profile/outbound-port/check-nickname-duplicate.outbound-port';
import { CheckNicknameDuplicateRepository } from '../../profile/outbound-adapter/check-nickname-duplicate.repository';

@Injectable()
export class SignupService implements SignupInboundPort {
  constructor(
    @Inject(CheckEmailDuplicateRepository)
    private checkEmailDuplicateOutboundPort: CheckEmailDuplicateOutboundPort,
    @Inject(CheckNicknameDuplicateRepository)
    private checkNicknameDuplicateOutboundPort: CheckNicknameDuplicateOutboundPort,
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
    let randomNickname = createRandomNickname();
    let isNicknameDuplicate =
      await this.checkNicknameDuplicateOutboundPort.execute(randomNickname);
    while (isNicknameDuplicate) {
      randomNickname = createRandomNickname();
      isNicknameDuplicate =
        await this.checkNicknameDuplicateOutboundPort.execute(randomNickname);
    }
    const user = await this.createUserOutboundPort.execute({
      email,
      password: hashedPassword,
      randomNickname,
    });

    return user;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import {
  GoogleLoginInboundPort,
  GoogleLoginInboundPortInputDto,
  GoogleLoginInboundPortOutputDto,
} from '../inbound-port/google-login.inbound-port';
import { GetUserByEmailRepository } from '../outbound-adapter/get-user-by-email.repository';
import { GetUserByEmailOutboundPort } from '../outbound-port/get-user-by-email.outbound-port';
import { CreateSocialUserOutboundPort } from '../outbound-port/create-social-user.outbound-port';
import { CreateSocialUserRepository } from '../outbound-adapter/create-social-user.repository';
import { createRandomNickname } from '../utils/create-random-nickname';
import { CheckNicknameDuplicateRepository } from '../../profile/outbound-adapter/check-nickname-duplicate.repository';
import { CheckNicknameDuplicateOutboundPort } from '../../profile/outbound-port/check-nickname-duplicate.outbound-port';

@Injectable()
export class GoogleLoginService implements GoogleLoginInboundPort {
  constructor(
    @Inject(GetUserByEmailRepository)
    private getUserByEmailOutboundPort: GetUserByEmailOutboundPort,
    @Inject(CheckNicknameDuplicateRepository)
    private checkNicknameDuplicateOutboundPort: CheckNicknameDuplicateOutboundPort,
    @Inject(CreateSocialUserRepository)
    private createSocialUserOutboundPort: CreateSocialUserOutboundPort,
  ) {}
  async execute(
    params: GoogleLoginInboundPortInputDto,
  ): Promise<GoogleLoginInboundPortOutputDto> {
    const { email } = params;
    const user = await this.getUserByEmailOutboundPort.execute(email);
    if (user && !user.password) {
      return {
        userId: user.userId,
        profileId: user.profileId,
        profile: {
          nickname: user.profile.nickname,
          avatarUrl: user.profile.image.url,
        },
      };
    }
    if (user && user.password) {
      return null;
    }
    let randomNickname = createRandomNickname();
    let isNicknameDuplicate =
      await this.checkNicknameDuplicateOutboundPort.execute(randomNickname);
    while (isNicknameDuplicate) {
      randomNickname = createRandomNickname();
      isNicknameDuplicate =
        await this.checkNicknameDuplicateOutboundPort.execute(randomNickname);
    }
    const newUser = await this.createSocialUserOutboundPort.execute({
      ...params,
      nickname: randomNickname,
    });
    return {
      userId: newUser.userId,
      profileId: newUser.profileId,
      profile: {
        nickname: newUser.profile.nickname,
        avatarUrl: newUser.profile.image.url,
      },
    };
  }
}

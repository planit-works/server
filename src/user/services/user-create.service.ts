import { ProfileCreateService } from './../../profile/services/profile-create.service';
import { SignupReqDto } from './../../auth/dtos/signup.req.dto';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCreateService {
  constructor(
    private userRepository: UserRepository,
    private profileCreateService: ProfileCreateService,
  ) {}

  public async create(signupReqDto: SignupReqDto) {
    const profile = await this.profileCreateService.create();
    return await this.userRepository.create({
      ...signupReqDto,
      profile,
      profileId: profile.id,
    });
  }
}

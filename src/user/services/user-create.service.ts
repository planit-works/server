import { SignupReqDto } from './../../auth/dtos/signup.req.dto';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCreateService {
  constructor(private userRepository: UserRepository) {}

  create(createUserDto: SignupReqDto) {
    return this.userRepository.create(createUserDto);
  }
}

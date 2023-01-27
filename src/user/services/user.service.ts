import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findAll() {
    return `This action returns all user`;
  }

  findById(id: number) {
    return this.userRepository.findById(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

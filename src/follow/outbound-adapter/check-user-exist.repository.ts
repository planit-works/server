import { CheckUserExistOutboundPort } from '../outbound-port/check-user-exist.outbound-port';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class CheckUserExistRepository implements CheckUserExistOutboundPort {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(userId: number): Promise<boolean> {
    return await this.userRepository.exist({ where: { id: userId } });
  }
}

import { User } from './../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckEmailDuplicateOutboundPort } from './../outbound-port/check-email-duplicate.outbound-port';

@Injectable()
export class CheckEmailDuplicateRepository
  implements CheckEmailDuplicateOutboundPort
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user !== null;
  }
}

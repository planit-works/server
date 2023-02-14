import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../../user/entities/user.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Repository } from 'typeorm';
import {
  CreateUserOutboundPort,
  CreateUserOutboundPortInputDto,
} from '../outbound-port/create-user.outbound-port';
import { Connection } from 'typeorm';

@Injectable()
export class CreateUserRepository implements CreateUserOutboundPort {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private connection: Connection,
  ) {}

  async execute(params: CreateUserOutboundPortInputDto): Promise<User> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let user = this.userRepository.create(params);
    let profile = this.profileRepository.create();
    try {
      profile = await queryRunner.manager.save(profile);
      user.profileId = profile.id;
      user = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('알 수 없는 에러');
    } finally {
      await queryRunner.release();
    }
    user.profile = profile;
    return user;
  }
}

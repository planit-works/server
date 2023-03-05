import { Profile } from '../../entities/profile.entity';
import { User } from '../../entities/user.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserOutboundPort,
  CreateUserOutboundPortInputDto,
} from '../outbound-port/create-user.outbound-port';
import { DataSource } from 'typeorm';
import { Password } from '../../entities/password.entity';

@Injectable()
export class CreateUserRepository implements CreateUserOutboundPort {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Password)
    private passwordRepository: Repository<Password>,
    private dataSource: DataSource,
  ) {}

  async execute(params: CreateUserOutboundPortInputDto): Promise<User> {
    const { email, password, randomNickname: nickname } = params;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let user = this.userRepository.create({ email });
    const passwordEntity = this.passwordRepository.create({ password });
    let profile = this.profileRepository.create({ nickname });
    try {
      profile = await queryRunner.manager.save(profile);
      user.profileId = profile.profileId;
      user = await queryRunner.manager.save(user);
      passwordEntity.userId = user.userId;
      await queryRunner.manager.save(passwordEntity);
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

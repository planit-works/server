import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateSocialUserOutboundPort,
  CreateSocialUserOutboundPortInputDto,
  CreateSocialUserOutboundPortOutputDto,
} from '../outbound-port/create-social-user.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { Image, Oauth, Profile, User } from '../../entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CreateSocialUserRepository
  implements CreateSocialUserOutboundPort
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Oauth) private oauthRepository: Repository<Oauth>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private dataSource: DataSource,
  ) {}

  async execute(
    params: CreateSocialUserOutboundPortInputDto,
  ): Promise<CreateSocialUserOutboundPortOutputDto> {
    const { email, avatarUrl, nickname, provider, refreshToken } = params;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let user = this.userRepository.create({ email });
    const oauth = this.oauthRepository.create({ refreshToken, provider });
    let profile = this.profileRepository.create({ nickname });
    let image = this.imageRepository.create({ url: avatarUrl });
    try {
      image = await queryRunner.manager.save(image);
      profile.imageId = image.imageId;
      profile = await queryRunner.manager.save(profile);
      user.profileId = profile.profileId;
      user = await queryRunner.manager.save(user);
      oauth.userId = user.userId;
      await queryRunner.manager.save(oauth);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('알 수 없는 에러');
    } finally {
      await queryRunner.release();
    }
    profile.image = image;
    user.profile = profile;
    return user;
  }
}

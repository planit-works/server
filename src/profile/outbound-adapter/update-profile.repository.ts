import { Profile } from '../../entities/profile.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Image } from '../../entities/image.entity';
import {
  UpdateProfileOutboundPort,
  UpdateProfileOutboundPortInputDto,
} from '../outbound-port/update-profile.outbound-port';

@Injectable()
export class UpdateProfileRepository implements UpdateProfileOutboundPort {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private dataSource: DataSource,
  ) {}

  async execute(params: UpdateProfileOutboundPortInputDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { profileId, avatarUrl, ...updateInfo } = params;
      const profile = await this.profileRepository.findOneBy({ profileId });
      Object.assign(profile, updateInfo);
      let image;
      if (avatarUrl) {
        if (profile.imageId === 1) {
          image = this.imageRepository.create({ url: avatarUrl });
        } else {
          image = await this.imageRepository.findOneBy({
            imageId: profile.imageId,
          });
          image.url = avatarUrl;
        }
        await queryRunner.manager.save(image);
        profile.image = image;
      }
      await queryRunner.manager.save(profile);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Internal Server Error');
    } finally {
      await queryRunner.release();
    }
  }
}

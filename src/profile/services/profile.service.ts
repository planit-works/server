import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfileService {
  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new userProfile';
  }

  findAll() {
    return `This action returns all userProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProfile`;
  }

  update(id: number, updateUserProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} userProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProfile`;
  }
}

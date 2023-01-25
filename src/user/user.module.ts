import { UserFindByEmailService } from './services/user-find-by-email.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCreateService } from './services/user-create.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UserCreateService, UserFindByEmailService, UserRepository],
  exports: [UserCreateService, UserFindByEmailService],
})
export class UserModule {}

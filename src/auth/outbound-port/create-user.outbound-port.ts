import { User } from '../../entities/user.entity';

export interface CreateUserOutboundPortInputDto {
  email: string;
  password: string;
}

export interface CreateUserOutboundPort {
  execute(params: CreateUserOutboundPortInputDto): Promise<User>;
}

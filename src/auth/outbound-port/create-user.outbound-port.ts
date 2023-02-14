import { User } from '../../user/entities/user.entity';

export interface CreateUserOutboundPortInputDto {
  email: string;
  password: string;
}

export interface CreateUserOutboundPort {
  execute(params: CreateUserOutboundPortInputDto): Promise<User>;
}

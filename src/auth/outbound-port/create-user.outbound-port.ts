import { User } from '../../entities';

export interface CreateUserOutboundPortInputDto {
  email: string;
  password: string;
  nickname: string;
}

export interface CreateUserOutboundPort {
  execute(params: CreateUserOutboundPortInputDto): Promise<User>;
}

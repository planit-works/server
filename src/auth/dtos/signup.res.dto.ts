import { PickType } from '@nestjs/swagger';
import { LoginResDto } from './login.res.dto';

export class SignupResDto extends PickType(LoginResDto, [
  'userId',
  'profile',
] as const) {}

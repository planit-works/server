import { PickType } from '@nestjs/swagger';
import { SignupReqDto } from './signup.req.dto';

export class LoginReqDto extends PickType(SignupReqDto, [
  'email',
  'password',
] as const) {}

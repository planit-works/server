import {
  GetUserByEmailOutboundPort,
  GetUserByEmailOutboundPortOutputDto,
} from '../outbound-port/get-user-by-email.outbound-port';
import { LoginService } from './login.service';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';

class MockGetUserByEmailOutboundPort implements GetUserByEmailOutboundPort {
  private readonly users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  async execute(email: string) {
    const user = this.users.find((user) => user.email === email);
    return Promise.resolve(user as GetUserByEmailOutboundPortOutputDto);
  }
}

let loginService: LoginService;
let hashedPassword: string;
let users: User[];
let password = 'test1234!';

describe('LoginService 유닛 테스트', () => {
  beforeEach(async () => {
    hashedPassword = await bcrypt.hash(password, 12);
    users = [
      {
        userId: 1,
        email: 'test1234@gmail.com',
        profileId: 1,
        profile: null,
      },
    ];
    loginService = new LoginService(new MockGetUserByEmailOutboundPort(users));
  });

  test('AuthLoginService를 인스턴스로 생성할 수 있다.', async () => {
    expect(loginService).toBeDefined();
  });

  test('가입되지 않은 이메일에 대해 400 상태코드를 반환한다', async () => {
    await expect(
      loginService.execute({ email: 'test123@gmail.com', password: password }),
    ).rejects.toThrow(BadRequestException);
  });

  test('잘못된 비밀번호일 경우 400 에러를 반환한다.', async () => {
    await expect(
      loginService.execute({
        email: 'test1234@gmail.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  test('이메일/비밀번호가 정상일 경우 유저를 반환한다', async () => {
    const result = await loginService.execute({
      email: 'test1234@gmail.com',
      password: password,
    });
    expect(result).toStrictEqual({
      id: 1,
      email: 'test1234@gmail.com',
      password: hashedPassword,
      profileId: 1,
      profile: null,
    });
  });
});

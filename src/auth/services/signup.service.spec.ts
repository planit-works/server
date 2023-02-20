import { SignupService } from './signup.service';
import { ConflictException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  CreateUserOutboundPort,
  CreateUserOutboundPortInputDto,
} from '../outbound-port/create-user.outbound-port';
import { CheckEmailDuplicateOutboundPort } from '../outbound-port/check-email-duplicate.outbound-port';

class MockCheckEmailDuplicateOutboundPort
  implements CheckEmailDuplicateOutboundPort
{
  private readonly users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  async execute(email: string) {
    const user = this.users.find((user) => user.email === email);
    return Promise.resolve(user !== undefined);
  }
}

class MockCreateUserOutboundPort implements CreateUserOutboundPort {
  async execute(params: CreateUserOutboundPortInputDto) {
    return Promise.resolve({
      id: 2,
      email: params.email,
      password: await bcrypt.hash(params.password, 12),
      profileId: 2,
      profile: {
        id: 2,
        nickname: '익명의 사용자',
        avatarUrl: 'avatars/default',
        bio: '',
      },
    });
  }
}

let signupService: SignupService;
let hashedPassword: string;
let users: User[];
let password = 'test1234!';

describe('SignupService 유닛 테스트', () => {
  beforeEach(async () => {
    hashedPassword = await bcrypt.hash(password, 12);
    users = [
      {
        id: 1,
        email: 'test1234@gmail.com',
        password: hashedPassword,
        profileId: 1,
        profile: null,
      },
    ];

    signupService = new SignupService(
      new MockCheckEmailDuplicateOutboundPort(users),
      new MockCreateUserOutboundPort(),
    );
  });

  test('SignupService를 인스턴스로 생성할 수 있다.', async () => {
    expect(signupService).toBeDefined();
  });

  test('사용 중인 이메일일 경우 409 에러를 반환한다.', async () => {
    await expect(
      signupService.execute({
        email: 'test1234@gmail.com',
        password: 'asdf',
      }),
    ).rejects.toThrow(ConflictException);
  });

  test('해쉬화된 비밀번호를 가진 유저를 생성한다', async () => {
    const user = await signupService.execute({
      email: 'test1235@gmail.com',
      password: 'test1234!',
    });
    const hashedPassword = user.password;
    expect(hashedPassword).not.toEqual('test1234!');
    expect(hashedPassword.length).toBeGreaterThan(30);
  });
});

import { User } from './../../user/entities/user.entity';
import { AuthLoginService } from './auth-login.service';
import { UserFindByEmailService } from '../../user/services/user-find-by-email.service';
import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthLoginService 테스트', () => {
  let service: AuthLoginService;
  let fakeUserFindByEmailService: Partial<UserFindByEmailService>;
  const password = 'test1234!';

  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const users: User[] = [
      {
        id: 1,
        email: 'test1234@gmail.com',
        password: hashedPassword,
        profile: null,
      },
    ];
    fakeUserFindByEmailService = {
      findByEmail: (email: string) => {
        const user = users.find((user) => user.email === email);
        if (!user) {
          throw new BadRequestException();
        }
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthLoginService,
        {
          provide: UserFindByEmailService,
          useValue: fakeUserFindByEmailService,
        },
      ],
    }).compile();

    service = module.get(AuthLoginService);
  });

  test('AuthLoginService를 인스턴스로 생성할 수 있다.', async () => {
    expect(service).toBeDefined();
  });

  test('가입되지 않은 이메일일 경우 400 에러를 반환한다', async () => {
    await expect(
      service.login({ email: 'test123@gmail.com', password: password }),
    ).rejects.toThrow(BadRequestException);
  });

  test('잘못된 비밀번호일 경우 400 에러를 반환한다.', async () => {
    await expect(
      service.login({ email: 'test1234@gmail.com', password: 'wrongpassword' }),
    ).rejects.toThrow(BadRequestException);
  });

  test('이메일/비밀번호가 정상일 경우 유저를 반환한다', () => {
    expect(
      service.login({ email: 'test1234@gmail.com', password: password }),
    ).toBeDefined();
  });
});

import { UserFindByEmailService } from './../../user/services/user-find-by-email.service';
import { AuthSignupService } from './auth-signup.service';
import { SignupReqDto } from '../dtos/signup.req.dto';
import { Test } from '@nestjs/testing';
import { UserCreateService } from '../../user/services/user-create.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthSignupService 테스트', () => {
  let service: AuthSignupService;
  let fakeUserCreateService: Partial<UserCreateService>;
  let fakeUserFindByEmailService: Partial<UserFindByEmailService>;

  beforeEach(async () => {
    fakeUserCreateService = {
      create: (signupReqDto: SignupReqDto) =>
        Promise.resolve({
          id: 1,
          email: signupReqDto.email,
          password: signupReqDto.password,
          profile: {
            id: 1,
            nickname: 'kku',
            avatarUrl: 'testUrl',
          },
        }),
    };

    fakeUserFindByEmailService = {
      findByEmail: (email: string) => Promise.resolve(null),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthSignupService,
        { provide: UserCreateService, useValue: fakeUserCreateService },
        {
          provide: UserFindByEmailService,
          useValue: fakeUserFindByEmailService,
        },
      ],
    }).compile();

    service = module.get(AuthSignupService);
  });

  it('AuthSignupService를 인스턴스로 생성할 수 있다.', async () => {
    expect(service).toBeDefined();
  });

  it('해쉬화된 비밀번호를 가진 유저를 생성한다', async () => {
    const user = await service.signup({
      email: 'test1234@gmail.com',
      password: 'test1234!',
    });
    const hashedPassword = user.password;
    expect(hashedPassword).not.toEqual('test1234!');
    expect(hashedPassword.length).toBeGreaterThan(30);
  });

  it('사용 중인 이메일일 경우 400 에러를 반환한다.', async () => {
    fakeUserFindByEmailService.findByEmail = (email: string) => {
      return Promise.resolve({
        id: 1,
        email: 'a',
        password: '1',
        profile: { id: 2, nickname: 'kku', avatarUrl: 'testUrl' },
      });
    };
    await expect(
      service.signup({
        email: 'asdf@asdf.com',
        password: 'asdf',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});

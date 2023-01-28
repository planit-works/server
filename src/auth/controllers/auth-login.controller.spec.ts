import { LoginReqDto } from './../dtos/login.req.dto';
import { AuthLoginController } from './auth-login.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginService } from '../services';
import { JwtService } from '@nestjs/jwt';

describe('AuthLoginController 테스트', () => {
  let controller: AuthLoginController;
  let fakeAuthLoginService: Partial<AuthLoginService>;
  let fakeJwtService: Partial<JwtService>;
  let response;

  beforeEach(async () => {
    response = {
      cookie: () => {
        return;
      },
    };
    fakeAuthLoginService = {
      login: (loginReqDto: LoginReqDto) => {
        return Promise.resolve({
          id: 1,
          email: loginReqDto.email,
          password: 'test1234!',
          profile: {
            id: 1,
            nickname: 'kku',
            avatarUrl: 'testUrl',
          },
        });
      },
    };

    fakeJwtService = {
      sign: () => {
        return 'jsonwebtoken';
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthLoginController],
      providers: [
        { provide: AuthLoginService, useValue: fakeAuthLoginService },
        { provide: JwtService, useValue: fakeJwtService },
      ],
    }).compile();

    controller = module.get(AuthLoginController);
  });

  it('AuthLoginController를 인스턴스로 생성할 수 있다.', async () => {
    expect(controller).toBeDefined();
  });

  it('AuthLoginService에서 유저를 반환한다', async () => {
    const result = await controller.login(
      {
        email: 'test1234@gmail.com',
        password: 'test1234!',
      },
      response,
    );
    await expect(result).toStrictEqual({ userId: 1, avatarUrl: 'testUrl' });
  });
});

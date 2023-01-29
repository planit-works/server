import { AppModule } from './../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Authentication E2E 테스트', () => {
  let app: INestApplication;
  const email = 'test1243@gmail.com';
  const password = 'test1234!';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('정상적인 회원가입 요청 시 201 상태코드를 반환한다.', () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({ email, password })
      .expect(201)
      .then((res) => {
        const { userId, avatarUrl } = res.body;
        expect(userId).toBeGreaterThanOrEqual(1);
        expect(avatarUrl).toEqual('avatars/default');
      });
  });

  test('이미 가입된 이메일에 대해 400 상태코드를 반환한다', () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({ email, password })
      .expect(400);
  });

  // test('유효한 인증 정보로 로그인 할 시 200 상태코드를 반환한다.', async () => {
  //   const res = await request(app.getHttpServer())
  //     .post('/auth/login')
  //     .send({ email, password })
  //     .expect(200);

  //   const cookie = res.get('Set-Cookie');

  //   const { body } = await request(app.getHttpServer())
  //     .get('/auth/verify')
  //     .set('Cookie', cookie)
  //     .expect(200);

  //   expect(body.userId).toBeGreaterThan(0);
  // });
});

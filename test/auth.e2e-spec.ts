import { AppModule } from './../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Authentication E2E 테스트', () => {
  let app: INestApplication;
  let email = 'test1236@gmail.com';
  let password = 'test1234!';
  let cookie: string[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('정상적인 회원가입 요청 시 201 상태코드를 반환한다.', async () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({ email, password })
      .expect(201)
      .then((res) => {
        const { userId, profile } = res.body;
        expect(userId).toBeGreaterThanOrEqual(1);
        expect(profile).toEqual({
          nickname: '익명의 사용자',
          avatarUrl: 'https://d2pkj6jz1ow9ba.cloudfront.net/avatars/default',
        });
      });
  });

  test('이미 가입된 이메일에 대해 400 상태코드를 반환한다', async () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({ email, password })
      .expect(400);
  });

  test('유효한 인증 정보로 로그인 할 시 200 상태코드를 반환한다.', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(200);

    cookie = res.get('Set-Cookie');
  });

  test('쿠키를 담아 유저 정보를 요청할 경우 200 상태코드와 body를 반환한다', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/auth/verify')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.userId).toBeGreaterThan(0);
    expect(body.profile).toStrictEqual({
      nickname: '익명의 사용자',
      avatarUrl: 'https://d2pkj6jz1ow9ba.cloudfront.net/avatars/default',
    });
  });

  test('로그아웃 요청에 대해 쿠키 삭제 후 204 상태코드를 반환한다.', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/logout')
      .expect(204);

    cookie = res.get('Set-Cookie');
    expect(cookie[0].split('; ').at(1)).toEqual('Max-Age=0');
  });
});

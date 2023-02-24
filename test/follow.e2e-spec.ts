import { AppModule } from '../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Follow E2E 테스트', () => {
  const randomNumber = Math.floor(Math.random() * 1000000);
  let app: INestApplication;
  let email = `test${randomNumber}@gmail.com`;
  let password = 'test1234!';
  let cookie: string[];
  let userId: number;
  let followingId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    let res = await request(app.getHttpServer())
      .post('/api/auth')
      .send({ email, password });

    userId = res.body.userId;
    cookie = res.get('Set-Cookie');

    res = await request(app.getHttpServer())
      .post('/api/auth')
      .send({ email: `test${randomNumber + 1}@gmail.com`, password });

    followingId = res.body.userId;
  });

  test('로그인된 유저가 아닐 경우 401 에러를 반환한다.', async () => {
    return request(app.getHttpServer())
      .post('/api/follow')
      .send({ followingId })
      .expect(401);
  });

  test('followingId 없이 요청할 경우 400 에러를 반환한다.', async () => {
    return request(app.getHttpServer())
      .post('/api/follow')
      .set('Cookie', cookie)
      .expect(400);
  });

  test('자신을 팔로우 할 경우 400 에러를 반환한다.', async () => {
    return request(app.getHttpServer())
      .post('/api/follow')
      .set('Cookie', cookie)
      .send({ followingId: userId })
      .expect(400);
  });

  test('다른 유저를 팔로우 할 경우 204 상태코드를 반환한다.', async () => {
    return request(app.getHttpServer())
      .post('/api/follow')
      .set('Cookie', cookie)
      .send({ followingId })
      .expect(204);
  });

  test('이미 팔로우 중인 유저를 팔로우 할 경우 400 에러를 반환한다.', async () => {
    return request(app.getHttpServer())
      .post('/api/follow')
      .set('Cookie', cookie)
      .send({ followingId })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});

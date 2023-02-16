import { AppModule } from '../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

let app: INestApplication;
let nickname = '봄날의 햇살 수현';
let bio = "Hi! I'm KeonU";
let avatarUrl = 'avatars/12345678';
let cookie: string[];

describe('Profile E2E 테스트', () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const res = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'test432124@gmail.com', password: 'test1234!' });

    cookie = res.get('Set-Cookie');
  });

  test('로그인하지 않은 상태에서 요청할 경우 401 에러를 반환한다.', async () => {
    return request(app.getHttpServer())
      .patch('/users/profile')
      .send({ nickname })
      .expect(401);
  });

  test('빈 Body로 요청할 경우 400 에러를 반환한다.', async () => {
    return request(app.getHttpServer())
      .patch('/users/profile')
      .set('Cookie', cookie)
      .expect(400);
  });

  test('정상적인 프로필 변경 요청에 대해 204 상태코드를 반환한다.(1)', async () => {
    return request(app.getHttpServer())
      .patch('/users/profile')
      .set('Cookie', cookie)
      .send({ nickname, bio, avatarUrl })
      .expect(204);
  });

  test('정상적인 프로필 변경 요청에 대해 204 상태코드를 반환한다.(2)', async () => {
    return request(app.getHttpServer())
      .patch('/users/profile')
      .set('Cookie', cookie)
      .send({ nickname, bio })
      .expect(204);
  });

  test('정상적인 프로필 변경 요청에 대해 204 상태코드를 반환한다.(3)', async () => {
    return request(app.getHttpServer())
      .patch('/users/profile')
      .set('Cookie', cookie)
      .send({ avatarUrl })
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});

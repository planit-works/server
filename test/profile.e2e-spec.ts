import { AppModule } from '../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Profile E2E 테스트', () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  let app: INestApplication;
  let userId: number;
  let cookie: string[];
  let email = `test${randomNumber}@gmail.com`;
  let nickname = '봄날의 햇살 수현';
  let bio = "Hi! I'm KeonU";
  let avatarUrl = 'avatars/12345678';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const res = await request(app.getHttpServer())
      .post('/api/auth')
      .send({ email, password: 'test1234!' });

    userId = res.body.userId;
    cookie = res.get('Set-Cookie');
  });

  test('로그인하지 않은 상태에서 프로필 조회를 요청할 경우 401 에러를 반환한다.', async () => {
    return request(app.getHttpServer())
      .post('/api/profiles')
      .send({ userId })
      .expect(401);
  });

  test('자신의 프로필을 조회할 경우 email을 포함한 유저 데이터를 반환한다.', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/api/profiles')
      .set('Cookie', cookie)
      .send({ userId })
      .expect(200);

    expect(body).toStrictEqual({
      id: userId,
      email,
      profile: {
        nickname: null,
        bio: null,
        avatarUrl: 'avatars/default',
      },
      followingCount: 0,
      followerCount: 0,
    });
  });

  test('다른 유저의 프로필을 조회할 경우 email을 제외한 유저 데이터를 반환한다.', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/api/profiles')
      .set('Cookie', cookie)
      .send({ userId: 1 })
      .expect(200);

    expect(body).toStrictEqual({
      id: 1,
      profile: {
        nickname: '봄날의 햇살 수현',
        bio: "Hi! I'm KeonU",
        avatarUrl: 'avatars/12345678',
      },
      followingCount: 0,
      followerCount: 0,
    });
  });

  test('로그인하지 않은 상태에서 프로필 변경을 요청할 경우 401 에러를 반환한다.', async () => {
    return request(app.getHttpServer())
      .patch('/api/profiles')
      .send({ nickname })
      .expect(401);
  });

  test('빈 Body로 요청할 경우 400 에러를 반환한다.', async () => {
    return request(app.getHttpServer())
      .patch('/api/profiles')
      .set('Cookie', cookie)
      .expect(400);
  });

  test('정상적인 프로필 변경 요청에 대해 204 상태코드를 반환한다.(1)', async () => {
    return request(app.getHttpServer())
      .patch('/api/profiles')
      .set('Cookie', cookie)
      .send({ nickname, bio, avatarUrl })
      .expect(204);
  });

  test('정상적인 프로필 변경 요청에 대해 204 상태코드를 반환한다.(2)', async () => {
    return request(app.getHttpServer())
      .patch('/api/profiles')
      .set('Cookie', cookie)
      .send({ nickname, bio })
      .expect(204);
  });

  test('정상적인 프로필 변경 요청에 대해 204 상태코드를 반환한다.(3)', async () => {
    return request(app.getHttpServer())
      .patch('/api/profiles')
      .set('Cookie', cookie)
      .send({ avatarUrl })
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});

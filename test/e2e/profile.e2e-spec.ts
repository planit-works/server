import { AppModule } from '../../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Profile E2E 테스트', () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  let app: INestApplication;
  let userId: number;
  let cookie: string[];
  let email = `test${randomNumber}@gmail.com`;
  let password = 'test1234!';
  let nickname: string;
  let bio: string;
  let avatarUrl = 'avatars/12345678';
  let anotherUserId: number;
  let anotherUserNickname: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const res = await request(app.getHttpServer())
      .post('/api/auth')
      .send({ email, password });

    userId = res.body.userId;
    nickname = res.body.profile.nickname;
    cookie = res.get('Set-Cookie');

    const res2 = await request(app.getHttpServer())
      .post('/api/auth')
      .send({ email: `test${randomNumber + 1}@gmail.com`, password });

    anotherUserId = res2.body.userId;
    anotherUserNickname = res2.body.profile.nickname;
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
      userId,
      email,
      profile: {
        nickname,
        bio: null,
        avatarUrl: 'avatars/default',
      },
      followingCount: 0,
      followerCount: 0,
      isFollowing: null,
    });
  });

  test('다른 유저의 프로필을 조회할 경우 email을 제외한 유저 데이터를 반환한다.', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/api/profiles')
      .set('Cookie', cookie)
      .send({ userId: anotherUserId })
      .expect(200);

    expect(body).toStrictEqual({
      userId: anotherUserId,
      email: null,
      profile: {
        nickname: anotherUserNickname,
        bio: null,
        avatarUrl: 'avatars/default',
      },
      followingCount: 0,
      followerCount: 0,
      isFollowing: false,
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
      .send({
        nickname: '봄날의 햇살 수연',
        bio: 'Hi, there!',
        avatarUrl: 'avatars/1234567891011',
      })
      .expect(204);
  });

  test('정상적인 프로필 변경 요청에 대해 204 상태코드를 반환한다.(2)', async () => {
    return request(app.getHttpServer())
      .patch('/api/profiles')
      .set('Cookie', cookie)
      .send({ nickname: '봄날의 햇살 수연', bio: 'Hi, there!' })
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

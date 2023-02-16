import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('헬스체크에 대해 204 상태코드를 반환한다.', () => {
    return request(app.getHttpServer()).get('/healthcheck').expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});

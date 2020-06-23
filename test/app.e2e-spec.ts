import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

describe(`UserController (e2e)`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/ (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/user`)
      .expect(200)
      .expect(`This action returns all users`);
  });
});

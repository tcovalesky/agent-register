import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

import { MongoClient } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { AppModule } from './app.module';
import { newUser, updatedUser } from '../test/mocks/user.mocks';

describe('AppController (e2e)', () => {
  let client, db, createdUserId, app: INestApplication;
  const { password, ...newUserWithoutPassword } = newUser;
  const wrongTokenMessage = {
    statusCode: 401,
    message: 'Usuário não autenticado.',
  };

  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URI);
    db = client.db();
    process.env.AUTH_TOKEN = 'correct-token';
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await db.collection('agents').deleteMany();
    await client.close();
    await mongoose.disconnect();
    await app.close();
  });

  it('/healthy (GET)', () => {
    return request(app.getHttpServer())
      .get('/healthy')
      .expect(200)
      .expect('Ok.');
  });

  it('/public/agents (GET wrong-token)', () => {
    return request(app.getHttpServer())
      .get('/public/agents?login=wrong-token')
      .expect(401)
      .expect(wrongTokenMessage);
  });

  it('/public/agents (POST wrong-token)', () => {
    return request(app.getHttpServer())
      .post('/public/agents?login=wrong-token')
      .expect(401)
      .expect(wrongTokenMessage);
  });

  it('/public/agents/{agentId} (GET wrong-token)', () => {
    const agentId = '1234';
    return request(app.getHttpServer())
      .get(`/public/agents/${agentId}?login=wrong-token`)
      .expect(401)
      .expect(wrongTokenMessage);
  });

  it('/public/agents/{agentId} (PUT wrong-token)', () => {
    const agentId = '1234';
    return request(app.getHttpServer())
      .put(`/public/agents/${agentId}?login=wrong-token`)
      .expect(401)
      .expect(wrongTokenMessage);
  });

  it('/public/agents/{agentId} (DELETE wrong-token)', () => {
    const agentId = '1234';
    return request(app.getHttpServer())
      .delete(`/public/agents/${agentId}?login=wrong-token`)
      .expect(401)
      .expect(wrongTokenMessage);
  });

  it('/public/agents (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/public/agents?login=correct-token')
      .send(newUser)
      .expect(201);

    createdUserId = response.body.id;

    expect(response.body).toStrictEqual({
      ...newUserWithoutPassword,
      id: createdUserId,
    });
  });

  it('/public/agents (GET)', () => {
    return request(app.getHttpServer())
      .get('/public/agents?login=correct-token')
      .expect(200)
      .expect([{ ...newUserWithoutPassword, id: createdUserId }]);
  });

  it('/public/agents/{agentId} (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/public/agents/${createdUserId}?login=correct-token`)
      .send(updatedUser)
      .expect(200)
      .expect({ ...updatedUser, id: createdUserId });
  });

  it('/public/agents/{agentId} (GET)', () => {
    return request(app.getHttpServer())
      .get(`/public/agents/${createdUserId}?login=correct-token`)
      .expect(200)
      .expect({ ...updatedUser, id: createdUserId });
  });

  it('/public/agents/{agentId} (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/public/agents/${createdUserId}?login=correct-token`)
      .expect(200);
  });
});

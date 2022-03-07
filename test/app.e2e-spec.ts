import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { newUser, updatedUser } from './mocks/user.mocks';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const wrongTokenMessage = {
    statusCode: 401,
    message: 'Usuário não autenticado.',
  };

  beforeAll(() => {
    process.env.AUTH_TOKEN = 'correct-token';
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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

  it('/public/agents (POST)', () => {
    return request(app.getHttpServer())
      .post('/public/agents?login=correct-token')
      .send(newUser)
      .expect(201)
      .expect('This action adds a new agent');
  });

  it('/public/agents (GET)', () => {
    return request(app.getHttpServer())
      .get('/public/agents?login=correct-token')
      .expect(200)
      .expect('This action returns all agents');
  });

  it('/public/agents/{agentId} (PUT)', () => {
    const agentId = '1234';
    return request(app.getHttpServer())
      .put(`/public/agents/${agentId}?login=correct-token`)
      .send(updatedUser)
      .expect(200)
      .expect(`This action updates a #${agentId} agent`);
  });

  it('/public/agents/{agentId} (GET)', () => {
    const agentId = '1234';
    return request(app.getHttpServer())
      .get(`/public/agents/${agentId}?login=correct-token`)
      .expect(200)
      .expect(`This action returns a #${agentId} agent`);
  });

  it('/public/agents/{agentId} (DELETE)', () => {
    const agentId = '1234';
    return request(app.getHttpServer())
      .delete(`/public/agents/${agentId}?login=correct-token`)
      .expect(200)
      .expect(`This action removes a #${agentId} agent`);
  });
});

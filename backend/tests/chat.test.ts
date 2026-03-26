import request from 'supertest';
import app from '../src/app';

describe('Chatting API', () => {

  it('should return bad request when message is missing', async () => {
    const res = await request(app).post('/api/v1/chat/').send({message: 'Hi, I want something cold and strong but not too sweet.'});

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('message');
  }, 20000);
});

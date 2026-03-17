import request from 'supertest';
import app from '../src/app';

describe('Chatting API', () => {
  it('should return status ok for chat endpoint', async () => {
    const res = await request(app).post('/api/v1/chat/').send({ message: 'Hello, how are you?' });
    console.log(res.body); // Log the response data for debugging

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    // Add more assertions based on the expected response structure
  }, 60000);
});
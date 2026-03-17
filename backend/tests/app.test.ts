// tests/app.test.ts
import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/ProductService', () => ({
  getAllProducts: jest.fn().mockResolvedValue([
    { name: 'Test Product', price: 10 }
  ])
}));

describe('GET /api/v1/products/', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/api/v1/products/?limit=10&skip=0');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
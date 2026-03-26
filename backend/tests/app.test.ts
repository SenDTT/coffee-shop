// tests/app.test.ts
import { getAllProductsController } from '../src/controllers/ProductController';

jest.mock('../src/services/ProductService', () => ({
  getAllProducts: jest.fn().mockResolvedValue([
    { name: 'Test Product', price: 10 }
  ])
}));

describe('getAllProductsController', () => {
  it('should return products successfully', async () => {
    const req = {
      query: { limit: '10', skip: '0' },
    } as any;
    const res = {
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await getAllProductsController(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: [{ name: 'Test Product', price: 10 }],
    });
    expect(next).not.toHaveBeenCalled();
  });
});

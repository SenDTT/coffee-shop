import { getMockRecommendationController } from '../src/controllers/ProductController';

describe('Mock internal API for n8n demos', () => {
  it('should return a coffee recommendation payload', async () => {
    const req = {
      body: {
        customerName: 'Alex',
        mood: 'needs energy',
        temperature: 'iced',
        category: 'coffee',
      },
    } as any;
    const res = {
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    await getMockRecommendationController(req, res, next);

    const payload = res.json.mock.calls[0][0];

    expect(payload.success).toBe(true);
    expect(payload.data.customerName).toBe('Alex');
    expect(payload.data.recommendation).toMatchObject({
      category: 'coffee',
      temperature: 'iced',
      name: 'Iced Latte',
    });
    expect(payload.data).toHaveProperty('requestId');
    expect(payload.data).toHaveProperty('suggestedUpsell');
    expect(next).not.toHaveBeenCalled();
  });
});

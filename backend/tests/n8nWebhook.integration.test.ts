describe('n8n webhook integration', () => {
  it('should send a real request to /webhook-test/coffee-demo', async () => {
    const webhookUrl =
      process.env.N8N_TEST_WEBHOOK_URL ||
      'http://localhost:5678/webhook-test/coffee-demo';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName: 'Alex',
        mood: 'needs energy',
        temperature: 'iced',
        category: 'coffee',
      }),
    });

    expect(response.ok).toBe(true);

    const payload = await response.json();

    expect(payload.success).toBe(true);
    expect(payload).toHaveProperty('recommendation');
  }, 20000);
});

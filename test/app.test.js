const request = require('supertest');
const app = require('../index');

describe('GET /api/greet', () => {
  it('should return greeting', async () => {
    const res = await request(app).get('/api/greet?name=Sanjai');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Hello, Sanjai!');
  });
});

describe('GET /health', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});

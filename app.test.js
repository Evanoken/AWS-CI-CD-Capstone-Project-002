const { app, server } = require('../src/app');
const request = require('supertest');

describe('App Tests', () => {
  afterAll(() => {
    server.close();
  });

  test('GET / returns 200 and HTML content', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Hello from AWS CI/CD');
  });

  test('GET /health returns healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  test('basic arithmetic sanity check', () => {
    expect(2 + 2).toBe(4);
  });
});

const request = require('supertest');

describe('The Node server', () => {
  let server;

  beforeEach(() => {
    server = require('./server');
  });

  afterEach(() => server.close());

  it('Sends a 404 for missing routes', () =>
    request(server)
      .get('/notfound')
      .then(res => {
        expect(res.statusCode).toBe(404);
      }));
});

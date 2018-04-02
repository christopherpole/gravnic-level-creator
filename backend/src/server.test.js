const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') });
const request = require('supertest');

describe('The Node server', () => {
  let server;

  beforeEach(() => {
    server = require('./server');
  });

  afterEach(() => server.close()); //  @FIXME: wait for server to close before proceeding

  it('Sends a 404 for missing routes', () =>
    request(server)
      .get('/notfound')
      .then(res => {
        expect(res.statusCode).toBe(404);
      }));
});

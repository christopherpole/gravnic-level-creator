const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') });
const request = require('supertest');

describe('/solveLevel', () => {
  let server;

  beforeEach(() => {
    server = require('../server');
  });

  afterEach(() => server.close()); //  @FIXME: wait for server to close before proceeding

  //  @TODO
  describe('GET action', () => {
    it('Returns ', async done => {
      await request(server)
        .get('/solveLevel')
        .then(res => {
          expect(res.statusCode).toBe(200);
        });

      done();
    });
  });
});

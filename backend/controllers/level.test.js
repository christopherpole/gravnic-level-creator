const request = require('supertest');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const testLevel = {
  name: 'Test Level',
  tiles: [...Array(100)].map((_, index) => ({
    selectedTileId: 0,
    position: index,
  })),
};

describe('The /levels routes', () => {
  let server;
  let recordId;

  beforeAll(() =>
    mongoose
      .connect(`mongodb://localhost/gravnic-level-creator-test`, {
        useMongoClient: false,
      })
      .then(() => mongoose.connection.db.dropDatabase())
      .then(() => mongoose.connection.db.close()),
  );

  beforeEach(() => {
    server = require('../server');
  });

  afterEach(() => server.close());

  describe('POST actions', () => {
    it('Can create new levels', () =>
      request(server)
        .post('/levels')
        .send(testLevel)
        .then(res => {
          recordId = res.body.id;
          expect(res.statusCode).toBe(201);
          expect(res.body.name).toBe(testLevel.name);
          expect(res.body.tiles.length).toBe(100);
        }));
  });

  describe('GET actions', () => {
    it('Retrieves all of the levels', () =>
      request(server)
        .get('/levels')
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body.length).toBe(1);
          expect(res.body[0].name).toBe(testLevel.name);
          expect(res.body[0].tiles.length).toBe(100);
        }));

    it('Can find a single level by ID', () =>
      request(server)
        .get(`/levels/${recordId}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.name).toBe(testLevel.name);
          expect(res.body.tiles.length).toBe(100);
        }));

    it('Returns a 404 error if the record is not found', () =>
      request(server)
        .get('/levels/5a96ee33cec42532bede3744')
        .then(res => {
          expect(res.statusCode).toBe(404);
        }));
  });

  describe('PUT actions', () => {
    it('Can update a level by ID', () =>
      request(server)
        .put(`/levels/${recordId}`)
        .send({
          name: 'Updated level name',
        })
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.name).toBe('Updated level name');
          expect(res.body.tiles.length).toBe(100);
        }));

    it('Returns a 404 error if the record is not found', () =>
      request(server)
        .put('/levels/5a96ee33cec42532bede3744')
        .send({
          name: 'Updated level name',
        })
        .then(res => {
          expect(res.statusCode).toBe(404);
        }));
  });

  describe('DELETE actions', () => {
    it('Can DELETE a single Level from its ID', () =>
      request(server)
        .del(`/levels/${recordId}`)
        .then(res => {
          expect(res.statusCode).toBe(204);

          return request(server)
            .get('/levels')
            .then(res2 => {
              expect(res2.statusCode).toBe(200);
              expect(res2.body).toBeInstanceOf(Array);
              expect(res2.body.length).toBe(0);
            });
        }));

    it('Returns a 404 error if the record is not found', () =>
      request(server)
        .delete('/levels/5a96ee33cec42532bede3744')
        .then(res => {
          expect(res.statusCode).toBe(404);
        }));
  });
});

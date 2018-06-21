const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') });
const request = require('supertest');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const testLevels = [
  {
    name: 'Test Level 1',
    tiles: [...Array(100)].map((_, index) => ({
      selectedTileId: 0,
      position: index,
    })),
    stars: [1, 2, 3],
    position: 1,
    solution: ['UP', 'DOWN'],
  },
  {
    name: 'Test Level 2',
    tiles: [...Array(100)].map((_, index) => ({
      selectedTileId: 1,
      position: index,
    })),
    stars: [4, 5, 6],
    position: 2,
    solution: false,
    maxMoves: 3,
  },
];

describe('/levels', () => {
  let server;
  const recordIds = [];

  beforeAll(() =>
    mongoose
      .connect(`mongodb://${process.env.DB_ADDRESS}/${process.env.DB_NAME}`, {
        useMongoClient: false,
      })
      .then(() => mongoose.connection.db.dropDatabase())
      .then(() => mongoose.connection.close()),
  );

  beforeEach(() => {
    server = require('../server');
  });

  afterEach(() => server.close()); //  @FIXME: wait for server to close before proceeding

  describe('POST action', () => {
    it('Creates new levels', async done => {
      await request(server)
        .post('/levels')
        .send(testLevels[0])
        .then(res => {
          recordIds[0] = res.body.id;
          expect(res.statusCode).toBe(201);
          expect(res.body.name).toBe(testLevels[0].name);
          expect(res.body.tiles.length).toBe(100);
          expect(res.body.stars).toEqual(testLevels[0].stars);
          expect(res.body.position).toEqual(testLevels[0].position);
          expect(res.body.solution).toEqual(['UP', 'DOWN']);
        });

      await request(server)
        .post('/levels')
        .send(testLevels[1])
        .then(res => {
          recordIds[1] = res.body.id;
          expect(res.statusCode).toBe(201);
          expect(res.body.name).toBe(testLevels[1].name);
          expect(res.body.tiles.length).toBe(100);
          expect(res.body.stars).toEqual(testLevels[1].stars);
          expect(res.body.position).toEqual(testLevels[1].position);
        });

      done();
    });
  });

  describe('GET action', () => {
    it('Retrieves all of the levels', () =>
      request(server)
        .get('/levels')
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body.length).toBe(2);
          expect(res.body[0].name).toBe(testLevels[0].name);
          expect(res.body[0].tiles.length).toBe(100);
          expect(res.body[0].stars).toEqual(testLevels[0].stars);
          expect(res.body[0].position).toEqual(testLevels[0].position);
          expect(res.body[0].solution).toEqual(['UP', 'DOWN']);
          expect(res.body[1].name).toBe(testLevels[1].name);
          expect(res.body[1].tiles.length).toBe(100);
          expect(res.body[1].stars).toEqual(testLevels[1].stars);
          expect(res.body[1].position).toEqual(testLevels[1].position);
        }));

    it('Can find a single level by ID', () =>
      request(server)
        .get(`/levels/${recordIds[1]}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.name).toBe(testLevels[1].name);
          expect(res.body.tiles.length).toBe(100);
          expect(res.body.stars).toEqual(testLevels[1].stars);
          expect(res.body.position).toEqual(testLevels[1].position);
          expect(res.body.solution).toBe(false);
          expect(res.body.maxMoves).toBe(3);
        }));

    it('Returns a 404 error if the record is not found', () =>
      request(server)
        .get('/levels/5a96ee33cec42532bede3744')
        .then(res => {
          expect(res.statusCode).toBe(404);
        }));
  });

  describe('PUT action', () => {
    it('Can update a level by ID', () =>
      request(server)
        .put(`/levels/${recordIds[1]}`)
        .send({
          name: 'Updated level name',
          solution: ['LEFT'],
        })
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.name).toBe('Updated level name');
          expect(res.body.tiles.length).toBe(100);
          expect(res.body.stars).toEqual(testLevels[1].stars);
          expect(res.body.position).toEqual(testLevels[1].position);
          expect(res.body.solution).toEqual(['LEFT']);
        }));

    it('Can update multiple levels', () =>
      request(server)
        .put('/levels')
        .send([
          {
            id: recordIds[0],
            name: 'Updated level name 1',
            solution: false,
            maxMoves: 4,
          },
          {
            id: recordIds[1],
            name: 'Updated level name 2',
            solution: ['DOWN'],
          },
        ])
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body[0].name).toBe('Updated level name 1');
          expect(res.body[0].tiles.length).toBe(100);
          expect(res.body[0].stars).toEqual(testLevels[0].stars);
          expect(res.body[0].position).toEqual(testLevels[0].position);
          expect(res.body[0].solution).toEqual(false);
          expect(res.body[0].maxMoves).toEqual(4);
          expect(res.body[1].name).toBe('Updated level name 2');
          expect(res.body[1].tiles.length).toBe(100);
          expect(res.body[1].stars).toEqual(testLevels[1].stars);
          expect(res.body[1].position).toEqual(testLevels[1].position);
          expect(res.body[1].solution).toEqual(['DOWN']);
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

  describe('DELETE action', () => {
    it('Can DELETE a single Level from its ID', () =>
      request(server)
        .del(`/levels/${recordIds[1]}`)
        .then(res => {
          expect(res.statusCode).toBe(204);
          return request(server)
            .get('/levels')
            .then(res2 => {
              expect(res2.statusCode).toBe(200);
              expect(res2.body).toBeInstanceOf(Array);
              expect(res2.body.length).toBe(1);
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

import { ENTITIES } from 'gravnic-game';
import path from 'path';
import dotenv from 'dotenv';
import request from 'supertest';

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

describe('/solveLevel', () => {
  let server;

  beforeEach(() => {
    server = require('../server');
  });

  afterEach(() => server.close()); //  @FIXME: wait for server to close before proceeding

  //  @TODO
  describe('GET action', () => {
    it('Returns the correct response when the given game state is unsolvable', async done => {
      const gameState = [
        [
          {
            staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#008000', id: 1 },
          },
        ],
      ];
      const encodedGameState = encodeURIComponent(JSON.stringify(gameState));

      await request(server)
        .get(`/solveLevel/${encodedGameState}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual({
            solved: false,
            maxMoves: process.env.MAX_MOVES,
          });
        });

      done();
    });

    it('Returns the correct response when the given game state is solvable', async done => {
      const gameState = [
        [
          {
            staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
            movableEntity: { entityId: ENTITIES.GLASS, id: 1 },
          },
        ],
      ];
      const encodedGameState = encodeURIComponent(JSON.stringify(gameState));

      await request(server)
        .get(`/solveLevel/${encodedGameState}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual({
            solved: true,
            solution: [],
          });
        });

      done();
    });
  });
});

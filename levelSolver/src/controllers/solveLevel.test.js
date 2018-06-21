import { ENTITIES, MOVE_RIGHT } from 'gravnic-game';
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
            solution: false,
            maxMoves: parseInt(process.env.MAX_MOVES, 10),
          });
        });

      done();
    });

    it('Returns the correct response when the given game state is solvable', async done => {
      const gameState = [
        [
          {
            staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
          },
          { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
          {
            staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
            movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 4 },
          },
        ],
      ];
      const encodedGameState = encodeURIComponent(JSON.stringify(gameState));

      await request(server)
        .get(`/solveLevel/${encodedGameState}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual({
            solution: [MOVE_RIGHT],
            maxMoves: parseInt(process.env.MAX_MOVES, 10),
          });
        });

      done();
    });
  });
});

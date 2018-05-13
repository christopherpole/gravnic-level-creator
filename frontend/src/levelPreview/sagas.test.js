import { MOVE_LEFT, ENTITIES, changeGravityDirection } from 'gravnic-game';
import { delay } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';

import { MAKE_MOVE, setGameState, makeMoveFinished, undoMoveFinished } from './actions';
import { makeMoveSaga, undoMoveSaga } from './sagas';

describe('The level preview sagas', () => {
  describe('The change gravity direction saga', () => {
    it('Update the game states until the entities have stopped moving', () => {
      const generator = makeMoveSaga({
        type: MAKE_MOVE,
        direction: MOVE_LEFT,
      });

      const gameState = [
        [
          {
            staticEntity: {
              id: 1,
              entityId: ENTITIES.FLOOR,
            },
            movableEntity: null,
          },
          {
            staticEntity: {
              id: 2,
              entityId: ENTITIES.FLOOR,
            },
            movableEntity: null,
          },
          {
            staticEntity: {
              id: 3,
              entityId: ENTITIES.FLOOR,
            },
            movableEntity: {
              id: 4,
              entityId: ENTITIES.BLOCK,
            },
          },
        ],
      ];

      const state = {
        levelPreview: {
          gameState: JSON.parse(JSON.stringify(gameState)),
          gameSpeed: 100,
        },
      };

      const gameStates = changeGravityDirection(gameState, MOVE_LEFT);

      //  Get the current game state from the store
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(select());

      //  The next action should be the move in progress
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameState(gameStates[0])));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, state.levelPreview.gameSpeed));

      //  The next action should be the move in progress
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameState(gameStates[1])));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, state.levelPreview.gameSpeed));

      //  The entities stopped action should be called
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(makeMoveFinished(gameStates)));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('The undo move saga', () => {
    it('Update the game states until the entities have stopped moving', () => {
      const generator = undoMoveSaga();

      const state = {
        levelPreview: {
          gameHistory: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[10, 11, 12], [13, 14, 15]]],
          gameSpeed: 500,
        },
      };

      //  Get the current game state from the store
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(select());

      //  The next action should be a move step
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameState([13, 14, 15])));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, state.levelPreview.gameSpeed));

      //  The next action should be another move step
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameState([10, 11, 12])));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, state.levelPreview.gameSpeed));

      //  The undo move finished action should be called
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(undoMoveFinished()));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });
  });
});

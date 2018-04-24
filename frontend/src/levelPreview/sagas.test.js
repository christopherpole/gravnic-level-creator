import { MOVE_LEFT, ENTITIES, calulateNextGameState } from 'gravnic-game';
import { delay } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';

import {
  CHANGE_GRAVITY_DIRECTION,
  updateGameState,
  entitiesStoppedMoving,
  undoMoveStep,
  undoMoveFinished,
} from './actions';
import { changeGravityDirectionSaga, undoMoveSaga } from './sagas';

describe('The level preview sagas', () => {
  describe('The change gravity direction saga', () => {
    it('Update the game states until the entities have stopped moving', () => {
      const generator = changeGravityDirectionSaga({
        type: CHANGE_GRAVITY_DIRECTION,
        direction: MOVE_LEFT,
      });

      let gameState = [
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

      //  Get the current game state from the store
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(select());

      //  The next action should be the move in progress
      gameState = calulateNextGameState(gameState, MOVE_LEFT);
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateGameState(gameState)));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, state.levelPreview.gameSpeed));

      //  The next action should be the move in progress
      gameState = calulateNextGameState(gameState, MOVE_LEFT);
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateGameState(gameState)));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, state.levelPreview.gameSpeed));

      //  The move should be completed now
      gameState = calulateNextGameState(gameState, MOVE_LEFT);
      expect(gameState).toBe(false);

      //  The entities stopped action should be called
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(entitiesStoppedMoving()));

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
          gameHistory: [[{}, {}, {}], [{}, {}]],
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
      expect(step.value).toEqual(put(undoMoveStep()));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, state.levelPreview.gameSpeed));

      //  The next action should be another move step
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(undoMoveStep()));

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

import { MOVE_LEFT, calulateNextGameState } from 'gravnic-game';
import { delay } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';

import {
  CHANGE_GRAVITY_DIRECTION,
  updateGameState,
  entitiesStoppedMoving,
} from '../actions/levelPreview';
import { changeGravityDirectionSaga } from './levelPreview';
import { ENTITY_MOVE_SPEED } from '../config/settings';

describe('The level preview sagas', () => {
  describe('The delete selected level saga', () => {
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
              entityId: 1,
            },
            movableEntity: null,
          },
          {
            staticEntity: {
              id: 2,
              entityId: 1,
            },
            movableEntity: null,
          },
          {
            staticEntity: {
              id: 3,
              entityId: 1,
            },
            movableEntity: {
              id: 4,
              entityId: 2,
            },
          },
        ],
      ];

      const state = {
        levelPreview: {
          gameState: JSON.parse(JSON.stringify(gameState)),
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
      expect(step.value).toEqual(call(delay, ENTITY_MOVE_SPEED));

      //  The next action should be the move in progress
      gameState = calulateNextGameState(gameState, MOVE_LEFT);
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateGameState(gameState)));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, ENTITY_MOVE_SPEED));

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
});

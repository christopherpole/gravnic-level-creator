import { MOVE_LEFT, ENTITIES, changeGravityDirection } from 'gravnic-game';
import { delay } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects';
import { DEFAULT_GAME_SPEED, FADING_GAME_SPEED, UNDOING_GAME_SPEED } from 'config/settings';

import {
  MAKE_MOVE,
  setGameState,
  makeMoveFinished,
  undoMoveFinished,
  setGameSpeed,
} from './actions';
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
            staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
            movableEntity: { id: 1, entityId: ENTITIES.BLOCK },
          },
          { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
          {
            staticEntity: { id: 5, entityId: ENTITIES.FLOOR },
            movableEntity: { id: 4, entityId: ENTITIES.BLOCK },
          },
          {
            staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
            movableEntity: { id: 6, entityId: ENTITIES.GLASS },
          },
        ],
      ];

      const state = {
        levelPreview: {
          gameState: JSON.parse(JSON.stringify(gameState)),
          gameSpeed: DEFAULT_GAME_SPEED,
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

      //  The next action should be setting the game speed
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameSpeed(FADING_GAME_SPEED)));

      //  The next action should be the move in progress
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameState(gameStates[1])));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, FADING_GAME_SPEED));

      //  The next action should be setting the game speed
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameSpeed(DEFAULT_GAME_SPEED)));

      //  The next action should be the move in progress
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameState(gameStates[2])));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, DEFAULT_GAME_SPEED));

      //  The next action should be the move in progress
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameState(gameStates[3])));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, DEFAULT_GAME_SPEED));

      //  The next action should be the move in progress
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameState(gameStates[4])));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, DEFAULT_GAME_SPEED));

      //  The entities stopped action should be called
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(makeMoveFinished(gameStates, true)));

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
          fastMode: false,
        },
      };

      //  Get the current game state from the store
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(select());

      //  The next action should be setting the game speed
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameSpeed(UNDOING_GAME_SPEED)));

      //  The next action should be a move step
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameState([13, 14, 15])));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, UNDOING_GAME_SPEED));

      //  The next action should be another move step
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameState([10, 11, 12])));

      //  The next action should be the pause
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(delay, UNDOING_GAME_SPEED));

      //  The next action should be setting the game speed
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(setGameSpeed(DEFAULT_GAME_SPEED)));

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

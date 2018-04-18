import { spy } from 'sinon';
import { MOVE_LEFT, convertTilesToGameState } from 'gravnic-game';
import testLevels from '../data/testLevels';

import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  RESTART_LEVEL,
  CHANGE_GRAVITY_DIRECTION,
  UPDATE_GAME_STATE,
  ENTITIES_STOPPED_MOVING,
  UNDO_MOVE,
  SET_GAME_SPEED,
  previewLevel,
  editLevel,
  restartLevel,
  changeGravityDirection,
  updateGameState,
  entitiesStoppedMoving,
  undoMove,
  setGameSpeed,
} from './levelPreview';

describe('The level preview actions', () => {
  describe('previewLevel()', () => {
    it('Creates the correct action', () => {
      const fn = previewLevel();
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          tiles: testLevels[0].tiles,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: PREVIEW_LEVEL,
          gameState: convertTilesToGameState(testLevels[0].tiles),
        }),
      ).toBe(true);
    });
  });

  describe('editLevel()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: EDIT_LEVEL,
      };

      expect(editLevel()).toEqual(expectedAction);
    });
  });

  describe('restartLevel()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: RESTART_LEVEL,
      };

      expect(restartLevel()).toEqual(expectedAction);
    });
  });

  describe('changeGravityDirection()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: CHANGE_GRAVITY_DIRECTION,
        direction: MOVE_LEFT,
      };

      expect(changeGravityDirection(MOVE_LEFT)).toEqual(expectedAction);
    });
  });

  describe('updateGameState()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: UPDATE_GAME_STATE,
        gameState: [1, 2, 3],
      };

      expect(updateGameState([1, 2, 3])).toEqual(expectedAction);
    });
  });

  describe('entitiesStoppedMoving()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: ENTITIES_STOPPED_MOVING,
      };

      expect(entitiesStoppedMoving()).toEqual(expectedAction);
    });
  });

  describe('undoMove()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: UNDO_MOVE,
      };

      expect(undoMove()).toEqual(expectedAction);
    });
  });

  describe('setGameSpeed()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: SET_GAME_SPEED,
        gameSpeed: 100,
      };

      expect(setGameSpeed(100)).toEqual(expectedAction);
    });
  });
});

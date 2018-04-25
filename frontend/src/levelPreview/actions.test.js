import { spy } from 'sinon';
import { MOVE_LEFT, convertTilesToGameState } from 'gravnic-game';
import testLevels from 'data/testLevels';

import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  RESTART_LEVEL,
  MAKE_MOVE,
  MAKE_MOVE_STEP,
  MAKE_MOVE_FINISHED,
  UNDO_MOVE,
  UNDO_MOVE_STEP,
  UNDO_MOVE_FINISHED,
  SET_GAME_SPEED,
  previewLevel,
  editLevel,
  restartLevel,
  makeMove,
  makeMoveStep,
  makeMoveFinished,
  undoMove,
  undoMoveStep,
  undoMoveFinished,
  setGameSpeed,
} from './actions';

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

  describe('makeMove()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: MAKE_MOVE,
        direction: MOVE_LEFT,
      };

      expect(makeMove(MOVE_LEFT)).toEqual(expectedAction);
    });
  });

  describe('makeMoveStep()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: MAKE_MOVE_STEP,
        gameState: [1, 2, 3],
      };

      expect(makeMoveStep([1, 2, 3])).toEqual(expectedAction);
    });
  });

  describe('makeMoveFinished()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: MAKE_MOVE_FINISHED,
      };

      expect(makeMoveFinished()).toEqual(expectedAction);
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

  describe('undoMoveStep()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: UNDO_MOVE_STEP,
      };

      expect(undoMoveStep()).toEqual(expectedAction);
    });
  });

  describe('undoMoveFinished()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: UNDO_MOVE_FINISHED,
      };

      expect(undoMoveFinished()).toEqual(expectedAction);
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
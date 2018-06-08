import { spy } from 'sinon';
import { MOVE_LEFT, MOVE_RIGHT } from 'gravnic-game';
import { convertEditorTilesToGameState } from 'utils';
import testLevels from 'data/testLevels';
import availableTiles from 'config/tiles';

import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  RESTART_LEVEL,
  MAKE_MOVE,
  SET_GAME_STATE,
  MAKE_MOVE_FINISHED,
  UNDO_MOVE,
  UNDO_MOVE_FINISHED,
  SET_GAME_SPEED,
  SET_FAST_MODE,
  previewLevel,
  editLevel,
  restartLevel,
  setGameState,
  makeMove,
  makeMoveFinished,
  undoMove,
  undoMoveFinished,
  setGameSpeed,
  setFastMode,
} from './actions';

describe('The level preview actions', () => {
  describe('previewLevel()', () => {
    it('Creates the correct action', () => {
      const fn = previewLevel();
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          tiles: testLevels[0].tiles,
          availableTiles,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: PREVIEW_LEVEL,
          gameState: convertEditorTilesToGameState(testLevels[0].tiles, availableTiles),
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

  describe('setGameState()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: SET_GAME_STATE,
        gameState: [1, 2, 3],
      };

      expect(setGameState([1, 2, 3])).toEqual(expectedAction);
    });
  });

  describe('makeMove()', () => {
    it('Creates the correct action if the move if valid', () => {
      const fn = makeMove(MOVE_LEFT);
      const dispatchSpy = spy();
      const getState = () => ({
        levelPreview: {
          entitiesMoving: false,
          gravityDirection: MOVE_RIGHT,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: MAKE_MOVE,
          direction: MOVE_LEFT,
        }),
      ).toBe(true);
    });

    it("Doesn't create the action if entities are moving", () => {
      const fn = makeMove(MOVE_LEFT);
      const dispatchSpy = spy();
      const getState = () => ({
        levelPreview: {
          entitiesMoving: true,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.called).toBe(false);
    });

    it("Doesn't create the action if current gravity direction equals the given direction", () => {
      const fn = makeMove(MOVE_LEFT);
      const dispatchSpy = spy();
      const getState = () => ({
        levelPreview: {
          entitiesMoving: false,
          gravityDirection: MOVE_LEFT,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.called).toBe(false);
    });

    it("Doesn't create the action if the level is complete", () => {
      const fn = makeMove(MOVE_LEFT);
      const dispatchSpy = spy();
      const getState = () => ({
        levelPreview: {
          levelComplete: true,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.called).toBe(false);
    });
  });

  describe('makeMoveFinished()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: MAKE_MOVE_FINISHED,
        gameStates: [1, 2, 3],
        levelComplete: true,
      };

      expect(makeMoveFinished([1, 2, 3], true)).toEqual(expectedAction);
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

  describe('setFastMode()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: SET_FAST_MODE,
        fastMode: true,
      };

      expect(setFastMode(true)).toEqual(expectedAction);
    });
  });
});

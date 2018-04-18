import { spy } from 'sinon';

import {
  RETRIEVE_LEVELS,
  SELECT_LEVEL,
  CREATE_NEW_LEVEL,
  LOAD_LEVEL,
  LOAD_LEVEL_CONFIRMED,
  SAVE_LEVEL,
  DELETE_SELECTED_LEVEL,
  DELETE_SELECTED_LEVEL_CONFIRMED,
  COPY_LEVEL,
  BEGIN_RENAME_LEVEL,
  CHANGE_RENAME_LEVEL,
  FINISH_RENAME_LEVEL,
  REORDER_LEVELS,
  SHOW_CONFIRMATION_SCREEN,
  CONFIRM_CONFIRMATION,
  CANCEL_CONFIRMATION,
  retrieveLevels,
  selectLevel,
  createNewLevel,
  loadLevel,
  loadLevelConfirmed,
  saveLevel,
  deleteSelectedLevel,
  deleteSelectedLevelConfirmed,
  copyLevel,
  beginRenameLevel,
  changeRenameLevel,
  finishRenameLevel,
  reorderLevels,
  showConfirmationScreen,
  confirmConfirmation,
  cancelConfirmation,
} from './levelManager';
import testLevels from '../data/testLevels';
import { createNewLevel as utilsCreateNewLevel } from '../utils';

describe('The level manager actions', () => {
  describe('retrieveLevels()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: RETRIEVE_LEVELS,
      };

      expect(retrieveLevels()).toEqual(expectedAction);
    });
  });

  describe('selectLevel()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: SELECT_LEVEL,
        id: testLevels[1].id,
      };

      expect(selectLevel(testLevels[1].id)).toEqual(expectedAction);
    });
  });

  describe('selectLevel()', () => {
    it('Creates the correct action', () => {
      const newLevel = utilsCreateNewLevel(9);

      const fn = createNewLevel();
      const dispatchSpy = spy();
      const getState = () => ({
        levelManager: {
          levels: [{ ...testLevels[0], position: 8 }, ...testLevels.slice(0)],
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      const level = dispatchSpy.firstCall.args[0];

      expect(level.type).toEqual(CREATE_NEW_LEVEL);
      expect(typeof level.level.id).toEqual('string');
      expect(level.level.name).toBe(newLevel.name);
      expect(level.level.tiles).toEqual(newLevel.tiles);
      expect(level.level.position).toEqual(newLevel.position);
    });
  });

  describe('loadLevel()', () => {
    it('Creates the correct action if changes have been made since the last save', () => {
      const fn = loadLevel();
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          editedSinceLastSave: true,
        },
        levelManager: {
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: LOAD_LEVEL,
          level: testLevels[1],
          message: 'Any unsaved changes will be lost. Proceed?',
        }),
      ).toBe(true);
    });

    it('Creates the correct action if no changes have been made since the last save', () => {
      const fn = loadLevel();
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          editedSinceLastSave: false,
        },
        levelManager: {
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: LOAD_LEVEL_CONFIRMED,
          level: testLevels[1],
        }),
      ).toBe(true);
    });
  });

  describe('loadLevelConfirmed()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: LOAD_LEVEL_CONFIRMED,
        level: testLevels[1],
      };

      expect(loadLevelConfirmed(testLevels[1])).toEqual(expectedAction);
    });
  });

  describe('saveLevel()', () => {
    it('Creates the correct action', () => {
      const fn = saveLevel();
      const dispatchSpy = spy();
      const getState = () => ({
        levelManager: {
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
        levelEditor: {
          tiles: [1, 2, 3],
          stars: [4, 5, 6],
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: SAVE_LEVEL,
          level: { ...testLevels[1], tiles: [1, 2, 3], stars: [4, 5, 6] },
        }),
      ).toBe(true);
    });
  });

  describe('deleteSelectedLevel()', () => {
    it('Creates the correct action', () => {
      const fn = deleteSelectedLevel();
      const dispatchSpy = spy();
      const getState = () => ({
        levelManager: {
          selectedLevelId: testLevels[1].id,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: DELETE_SELECTED_LEVEL,
          id: testLevels[1].id,
          message: 'Are you sure you want to permanently delete this level?',
        }),
      ).toBe(true);
    });
  });

  describe('deleteSelectedLevelConfirmed()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: DELETE_SELECTED_LEVEL_CONFIRMED,
        id: testLevels[1].id,
      };

      expect(deleteSelectedLevelConfirmed(testLevels[1].id)).toEqual(expectedAction);
    });
  });

  describe('copyLevel()', () => {
    it('Creates the correct action', () => {
      const fn = copyLevel();
      const dispatchSpy = spy();
      const getState = () => ({
        levelManager: {
          selectedLevelId: testLevels[1].id,
          levels: [{ ...testLevels[0], position: 8 }, ...testLevels.slice(0)],
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(dispatchSpy.firstCall.args[0].type).toBe(COPY_LEVEL);
      expect(typeof dispatchSpy.firstCall.args[0].level.id).toBe('string');
      expect(dispatchSpy.firstCall.args[0].level.name).toBe(testLevels[1].name);
      expect(dispatchSpy.firstCall.args[0].level.tiles).toEqual(testLevels[1].tiles);
      expect(dispatchSpy.firstCall.args[0].level.position).toEqual(9);
    });
  });

  describe('beginRenameLevel()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: BEGIN_RENAME_LEVEL,
      };

      expect(beginRenameLevel()).toEqual(expectedAction);
    });
  });

  describe('changeRenameLevel()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: CHANGE_RENAME_LEVEL,
        name: 'New level name',
      };

      expect(changeRenameLevel('New level name')).toEqual(expectedAction);
    });
  });

  describe('finishRenameLevel()', () => {
    it('Creates the correct action', () => {
      const fn = finishRenameLevel();
      const dispatchSpy = spy();
      const getState = () => ({
        levelManager: {
          renamingLevelId: testLevels[1].id,
          renamingLevelName: 'New level name',
          levels: testLevels,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: FINISH_RENAME_LEVEL,
          level: { ...testLevels[1], name: 'New level name' },
        }),
      ).toBe(true);
    });
  });

  describe('reorderLevels()', () => {
    it('Creates the correct action', () => {
      const fn = reorderLevels(2, 0);
      const dispatchSpy = spy();
      const getState = () => ({
        levelManager: {
          levels: [
            { ...testLevels[0], position: 1 },
            { ...testLevels[1], position: 4 },
            { ...testLevels[2], position: 6 },
          ],
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(dispatchSpy.firstCall.args[0].type).toBe(REORDER_LEVELS);
      expect(dispatchSpy.firstCall.args[0].levels).toEqual([
        { ...testLevels[2], position: 1 },
        { ...testLevels[0], position: 2 },
        { ...testLevels[1], position: 3 },
      ]);
    });
  });

  describe('showConfirmationScreen()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: SHOW_CONFIRMATION_SCREEN,
        message: 'Are you sure?',
      };

      expect(showConfirmationScreen('Are you sure?')).toEqual(expectedAction);
    });
  });

  describe('cancelConfirmation()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: CANCEL_CONFIRMATION,
      };

      expect(cancelConfirmation()).toEqual(expectedAction);
    });
  });

  describe('confirmConfirmation()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: CONFIRM_CONFIRMATION,
      };

      expect(confirmConfirmation()).toEqual(expectedAction);
    });
  });
});

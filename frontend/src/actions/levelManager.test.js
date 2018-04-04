import { spy } from 'sinon';

import {
  RETRIEVE_LEVELS,
  SELECT_LEVEL,
  CREATE_NEW_LEVEL,
  LOAD_LEVEL,
  SAVE_LEVEL,
  DELETE_SELECTED_LEVEL,
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
  saveLevel,
  deleteSelectedLevel,
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
  it('Should create an action retrieve all levels from the server', () => {
    const expectedAction = {
      type: RETRIEVE_LEVELS,
    };

    expect(retrieveLevels()).toEqual(expectedAction);
  });

  it('Should create an action select a level', () => {
    const expectedAction = {
      type: SELECT_LEVEL,
      id: testLevels[1].id,
    };

    expect(selectLevel(testLevels[1].id)).toEqual(expectedAction);
  });

  it('Should create an action create a level', () => {
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

  it('Should create an action to load a level', () => {
    const fn = loadLevel();
    const dispatchSpy = spy();
    const getState = () => ({
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
      }),
    ).toBe(true);
  });

  it('Should create an action to save a level', () => {
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

  it('Should create an action to delete a level', () => {
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
      }),
    ).toBe(true);
  });

  it('Should create an action copy a level', () => {
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

  it('Should create an action to start renaming a level', () => {
    const expectedAction = {
      type: BEGIN_RENAME_LEVEL,
    };

    expect(beginRenameLevel()).toEqual(expectedAction);
  });

  it('Should create an action for changing a level name', () => {
    const expectedAction = {
      type: CHANGE_RENAME_LEVEL,
      name: 'New level name',
    };

    expect(changeRenameLevel('New level name')).toEqual(expectedAction);
  });

  it('Should create an action to finish renaming a level', () => {
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

  it('Should create an action to reorder levels', () => {
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

  it('Should create an action to show the confirmation screen with a message', () => {
    const expectedAction = {
      type: SHOW_CONFIRMATION_SCREEN,
      message: 'Are you sure?',
    };

    expect(showConfirmationScreen('Are you sure?')).toEqual(expectedAction);
  });

  it('Should create an action to cancel the confirmation prompt', () => {
    const expectedAction = {
      type: CANCEL_CONFIRMATION,
    };

    expect(cancelConfirmation()).toEqual(expectedAction);
  });

  it('Should create an action to confirm the confirmation prompt', () => {
    const expectedAction = {
      type: CONFIRM_CONFIRMATION,
    };

    expect(confirmConfirmation()).toEqual(expectedAction);
  });
});

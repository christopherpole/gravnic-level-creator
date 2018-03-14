import { spy } from 'sinon';

import {
  SELECT_LEVEL,
  CREATE_LEVEL,
  LOAD_LEVEL,
  SAVE_LEVEL,
  DELETE_LEVEL,
  COPY_LEVEL,
  BEGIN_RENAME_LEVEL,
  CHANGE_RENAME_LEVEL,
  FINISH_RENAME_LEVEL,
  RETRIEVE_LEVELS,
  RETRIEVE_LEVELS_PENDING,
  RETRIEVE_LEVELS_FULFILLED,
  RETRIEVE_LEVELS_REJECTED,
  selectLevel,
  createLevel,
  loadLevel,
  saveLevel,
  deleteLevel,
  copyLevel,
  beginRenameLevel,
  changeRenameLevel,
  finishRenameLevel,
  retrieveLevels,
  retrieveLevelsPending,
  retrieveLevelsFulfilled,
  retrieveLevelsRejected,
} from './levelManager';

describe('The level manager actions', () => {
  it('Should create an action select a level', () => {
    const expectedAction = {
      type: SELECT_LEVEL,
      selectedLevelId: '2',
    };

    expect(selectLevel('2')).toEqual(expectedAction);
  });

  it('Should create an action create a level', () => {
    const result = createLevel();
    expect(result.type).toEqual(CREATE_LEVEL);
    expect(typeof result.newId).toBe('string');
  });

  it('Should create an action to load a level', () => {
    const fn = loadLevel();
    const dispatchSpy = spy();
    const getState = () => ({
      levelManager: {
        selectedLevelId: '2',
        currentLevelId: null,
        levels: [
          {
            id: '1',
            name: 'Test level 1',
            tiles: [1, 2, 3],
          },
          {
            id: '2',
            name: 'Test level 2',
            tiles: [4, 5, 6],
          },
        ],
      },
    });

    expect(typeof fn).toBe('function');
    fn(dispatchSpy, getState);
    expect(dispatchSpy.calledOnce).toBe(true);
    expect(
      dispatchSpy.calledWith({
        type: LOAD_LEVEL,
        levelId: '2',
        tiles: [4, 5, 6],
      }),
    ).toBe(true);
  });

  it('Should create an action to save a level', () => {
    const fn = saveLevel();
    const dispatchSpy = spy();
    const getState = () => ({
      levelManager: {
        selectedLevelId: '4',
      },
      levelEditor: {
        tiles: [1, 2, 3],
      },
    });

    expect(typeof fn).toBe('function');
    fn(dispatchSpy, getState);
    expect(dispatchSpy.calledOnce).toBe(true);
    expect(
      dispatchSpy.calledWith({
        type: SAVE_LEVEL,
        levelId: '4',
        tiles: [1, 2, 3],
      }),
    ).toBe(true);
  });

  it('Should create an action to delete a level', () => {
    const expectedAction = {
      type: DELETE_LEVEL,
    };

    expect(deleteLevel()).toEqual(expectedAction);
  });

  it('Should create an action copy a level', () => {
    const result = copyLevel('3');
    expect(result.type).toEqual(COPY_LEVEL);
    expect(typeof result.newId).toBe('string');
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
    const expectedAction = {
      type: FINISH_RENAME_LEVEL,
    };

    expect(finishRenameLevel()).toEqual(expectedAction);
  });

  it('Should create an action to retrieve levels', () => {
    const expectedAction = {
      type: RETRIEVE_LEVELS,
    };

    expect(retrieveLevels()).toEqual(expectedAction);
  });

  it('Should create an action to handle a pending retrieve levels API call', () => {
    const expectedAction = {
      type: RETRIEVE_LEVELS_PENDING,
    };

    expect(retrieveLevelsPending()).toEqual(expectedAction);
  });

  it('Should create an action to handle the successful retrieval of levels ', () => {
    const testLevels = [
      {
        id: '1',
        name: 'Test level',
        tiles: [1, 2, 3],
      },
    ];

    const expectedAction = {
      type: RETRIEVE_LEVELS_FULFILLED,
      levels: testLevels,
    };

    expect(retrieveLevelsFulfilled(testLevels)).toEqual(expectedAction);
  });

  it('Should create an action to handle the unsuccessful retrieval of levels', () => {
    const expectedAction = {
      type: RETRIEVE_LEVELS_REJECTED,
      error: 'Test error',
    };

    expect(retrieveLevelsRejected('Test error')).toEqual(expectedAction);
  });
});

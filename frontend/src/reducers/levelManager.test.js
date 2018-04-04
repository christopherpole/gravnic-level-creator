import reducer, { initialState as levelManagerInitialState } from './levelManager';
import {
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
  CANCEL_CONFIRMATION,
  CONFIRM_CONFIRMATION,
} from '../actions/levelManager';
import {
  RETRIEVE_LEVELS_PENDING,
  RETRIEVE_LEVELS_FULFILLED,
  RETRIEVE_LEVELS_REJECTED,
  CREATE_LEVEL_FULFILLED,
  CREATE_LEVEL_REJECTED,
  UPDATE_LEVEL_FULFILLED,
  UPDATE_LEVELS_FULFILLED,
  UPDATE_LEVEL_REJECTED,
  UPDATE_LEVELS_REJECTED,
  DELETE_LEVEL_REJECTED,
} from '../actions/api';
import testLevels from '../data/testLevels';
import { createNewLevel } from '../utils';

describe('The level manager reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(levelManagerInitialState);
  });

  it('Should handle the SELECT_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
        },
        {
          type: SELECT_LEVEL,
          id: testLevels[1].id,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      selectedLevelId: testLevels[1].id,
    });
  });

  it('Should handle the RETRIEVE_LEVELS_PENDING action', () => {
    expect(
      reducer(undefined, {
        type: RETRIEVE_LEVELS_PENDING,
      }),
    ).toEqual({
      ...levelManagerInitialState,
      loading: true,
    });
  });

  it('Should handle the RETRIEVE_LEVELS_FULFILLED action', () => {
    expect(
      reducer(undefined, {
        type: RETRIEVE_LEVELS_FULFILLED,
        levels: testLevels,
      }),
    ).toEqual({
      ...levelManagerInitialState,
      loading: false,
      loaded: true,
      error: false,
      levels: testLevels,
    });
  });

  it('Should handle the RETRIEVE_LEVELS_REJECTED action', () => {
    expect(
      reducer(undefined, {
        type: RETRIEVE_LEVELS_REJECTED,
        error: new Error('Test error'),
      }),
    ).toEqual({
      ...levelManagerInitialState,
      loading: false,
      loaded: false,
      error: true,
    });
  });

  it('Should handle the CREATE_NEW_LEVEL action', () => {
    const newLevel = createNewLevel();

    expect(
      reducer(
        {
          ...levelManagerInitialState,
          levels: testLevels,
        },
        {
          type: CREATE_NEW_LEVEL,
          level: newLevel,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      levels: [...testLevels, newLevel],
      selectedLevelId: newLevel.id,
      renamingLevelId: newLevel.id,
      renamingLevelName: newLevel.name,
    });
  });

  it('Should handle the COPY_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          levels: testLevels,
        },
        {
          type: COPY_LEVEL,
          level: { ...testLevels[1], id: '1337' },
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      selectedLevelId: '1337',
      renamingLevelId: '1337',
      renamingLevelName: testLevels[1].name,
      levels: [...testLevels, { ...testLevels[1], id: '1337' }],
    });
  });

  it('Should handle the CREATE_LEVEL_FULFILLED action', () => {
    const newLevel = createNewLevel();

    expect(
      reducer(
        {
          ...levelManagerInitialState,
          levels: testLevels,
          selectedLevelId: testLevels[1].id,
          currentLevelId: testLevels[1].id,
          renamingLevelId: testLevels[1].id,
        },
        {
          type: CREATE_LEVEL_FULFILLED,
          oldLevel: testLevels[1],
          newLevel,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      levels: [...testLevels.slice(0, 1), newLevel, ...testLevels.slice(2)],
      selectedLevelId: newLevel.id,
      currentLevelId: newLevel.id,
      renamingLevelId: newLevel.id,
    });

    expect(
      reducer(
        {
          ...levelManagerInitialState,
          levels: testLevels,
          selectedLevelId: testLevels[0].id,
          currentLevelId: testLevels[0].id,
          renamingLevelId: testLevels[0].id,
        },
        {
          type: CREATE_LEVEL_FULFILLED,
          oldLevel: testLevels[1],
          newLevel,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      levels: [...testLevels.slice(0, 1), newLevel, ...testLevels.slice(2)],
      selectedLevelId: testLevels[0].id,
      currentLevelId: testLevels[0].id,
      renamingLevelId: testLevels[0].id,
    });
  });

  it('Should handle the CREATE_LEVEL_REJECTED action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          loaded: true,
        },
        {
          type: CREATE_LEVEL_REJECTED,
          error: new Error('Test error'),
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      error: true,
      loaded: false,
    });
  });

  it('Should handle the UPDATE_LEVEL_FULFILLED action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          levels: testLevels,
        },
        {
          type: UPDATE_LEVEL_FULFILLED,
          level: { ...testLevels[1], name: 'New name' },
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      levels: [testLevels[0], { ...testLevels[1], name: 'New name' }, ...testLevels.slice(2)],
    });
  });

  it('Should handle the UPDATE_LEVELS_FULFILLED action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          levels: testLevels,
        },
        {
          type: UPDATE_LEVELS_FULFILLED,
          levels: [
            { ...testLevels[0], name: 'New name 1' },
            { ...testLevels[2], name: 'New name 3' },
          ],
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      levels: [
        { ...testLevels[0], name: 'New name 1' },
        testLevels[1],
        { ...testLevels[2], name: 'New name 3' },
        ...testLevels.slice(3),
      ],
    });
  });

  it('Should handle the LOAD_LEVEL action', () => {
    expect(
      reducer(undefined, {
        type: LOAD_LEVEL,
        level: testLevels[1],
      }),
    ).toEqual({
      ...levelManagerInitialState,
      currentLevelId: testLevels[1].id,
    });
  });

  it('Should handle the UPDATE_LEVEL_REJECTED action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          loaded: true,
        },
        {
          type: UPDATE_LEVEL_REJECTED,
          error: 'Test error',
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      error: true,
      loaded: false,
    });
  });

  it('Should handle the UPDATE_LEVELS_REJECTED action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          loaded: true,
        },
        {
          type: UPDATE_LEVELS_REJECTED,
          error: 'Test error',
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      error: true,
      loaded: false,
    });
  });

  it('Should handle the SAVE_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
        {
          type: SAVE_LEVEL,
          level: { ...testLevels[1], tiles: [10, 11, 12] },
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      selectedLevelId: testLevels[1].id,
      levels: [
        ...testLevels.slice(0, 1),
        { ...testLevels[1], tiles: [10, 11, 12] },
        ...testLevels.slice(2),
      ],
    });
  });

  it('Should handle the DELETE_SELECTED_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
        {
          type: DELETE_SELECTED_LEVEL,
          id: testLevels[1].id,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      selectedLevelId: null,
      levels: [...testLevels.slice(0, 1), ...testLevels.slice(2)],
    });
  });

  it('Should handle the DELETE_LEVEL_REJECTED action', () => {
    expect(
      reducer(undefined, {
        type: DELETE_LEVEL_REJECTED,
        error: 'Test error',
        loaded: true,
      }),
    ).toEqual({
      ...levelManagerInitialState,
      error: true,
      loaded: false,
    });
  });

  it('Should handle the BEGIN_RENAME_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          levels: testLevels,
          selectedLevelId: testLevels[1].id,
        },
        {
          type: BEGIN_RENAME_LEVEL,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      levels: testLevels,
      selectedLevelId: testLevels[1].id,
      renamingLevelId: testLevels[1].id,
      renamingLevelName: testLevels[1].name,
    });
  });

  it('Should handle the CHANGE_RENAME_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
        },
        {
          type: CHANGE_RENAME_LEVEL,
          name: 'New level name',
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      renamingLevelName: 'New level name',
    });
  });

  it('Should handle the FINISH_RENAME_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          levels: testLevels,
          renamingLevelId: testLevels[1].id,
          renamingLevelName: 'New level name',
        },
        {
          type: FINISH_RENAME_LEVEL,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      levels: [
        ...testLevels.slice(0, 1),
        { ...testLevels[1], name: 'New level name' },
        ...testLevels.slice(2),
      ],
      renamingLevelId: null,
      renamingLevelName: null,
    });
  });

  it('Should handle the REORDER_LEVELS action', () => {
    const reorderedLevels = [
      { ...testLevels[2], position: 1 },
      { ...testLevels[1], position: 2 },
      { ...testLevels[0], position: 3 },
    ];

    expect(
      reducer(
        {
          ...levelManagerInitialState,
          levels: testLevels,
        },
        {
          type: REORDER_LEVELS,
          levels: reorderedLevels,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      levels: reorderedLevels,
    });
  });

  it('Should handle the SHOW_CONFIRMATION_SCREEN action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
        },
        {
          type: SHOW_CONFIRMATION_SCREEN,
          message: 'Are you sure?',
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      confirmationMessage: 'Are you sure?',
    });
  });

  it('Should handle the CANCEL_CONFIRMATION action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          confirmationMessage: 'Are you sure?',
        },
        {
          type: CANCEL_CONFIRMATION,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      confirmationMessage: null,
    });
  });

  it('Should handle the CANCEL_CONFIRMATION action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          confirmationMessage: 'Are you sure?',
        },
        {
          type: CANCEL_CONFIRMATION,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      confirmationMessage: null,
    });
  });
});

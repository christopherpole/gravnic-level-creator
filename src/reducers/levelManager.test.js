import reducer, { initialState as levelManagerInitialState } from './levelManager';
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
  RETRIEVE_LEVELS_FULFILLED,
  RETRIEVE_LEVELS_REJECTED,
} from '../actions/levelManager';
import testLevels from '../data/testLevels';

describe('The level manager reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(levelManagerInitialState);
  });

  it('Should handle the SELECT_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          renamingLevelId: '1',
          renamingLevelName: 'New level',
        },
        {
          type: SELECT_LEVEL,
          selectedLevelId: testLevels[0].id,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      selectedLevelId: testLevels[0].id,
      renamingLevelId: null,
      renamingLevelName: null,
    });
  });

  it('Should handle the CREATE_LEVEL action', () => {
    expect(
      reducer(undefined, {
        type: CREATE_LEVEL,
        level: {
          id: '1337',
          name: 'New level',
          tiles: [...Array(100)].map((_, index) => ({
            position: index,
            selectedTileId: 0,
          })),
        },
      }),
    ).toEqual({
      ...levelManagerInitialState,
      levels: [
        ...levelManagerInitialState.levels,
        {
          id: '1337',
          name: 'New level',
          tiles: [...Array(100)].map((_, index) => ({
            position: index,
            selectedTileId: 0,
          })),
        },
      ],
      selectedLevelId: '1337',
      currentLevelId: '1337',
      renamingLevelId: '1337',
      renamingLevelName: 'New level',
    });
  });

  it('Should handle the LOAD_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          selectedLevelId: testLevels[0].id,
        },
        {
          type: LOAD_LEVEL,
          levelId: testLevels[0].id,
          tiles: testLevels[0].tiles,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      selectedLevelId: testLevels[0].id,
      currentLevelId: testLevels[0].id,
    });
  });

  it('Should handle the SAVE_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          selectedLevelId: testLevels[1].id,
          currentLevelId: null,
          levels: testLevels,
        },
        {
          type: SAVE_LEVEL,
          levelId: testLevels[1].id,
          tiles: [10, 11, 12],
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      selectedLevelId: testLevels[1].id,
      currentLevelId: testLevels[1].id,
      levels: [
        ...testLevels.slice(0, 1),
        { ...testLevels[1], tiles: [10, 11, 12] },
        ...testLevels.slice(2),
      ],
    });
  });

  it('Should handle the DELETE_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
        {
          type: DELETE_LEVEL,
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      selectedLevelId: null,
      levels: [...testLevels.slice(0, 1), ...testLevels.slice(2)],
    });
  });

  it('Should handle the COPY_LEVEL action', () => {
    expect(
      reducer(
        {
          ...levelManagerInitialState,
          selectedLevelId: testLevels[1].id,
          currentLevelId: testLevels[1].id,
          levels: testLevels,
        },
        {
          type: COPY_LEVEL,
          newId: '33',
        },
      ),
    ).toEqual({
      ...levelManagerInitialState,
      selectedLevelId: '33',
      currentLevelId: '33',
      levels: [
        ...testLevels.slice(0, 2),
        { ...testLevels[1], name: `${testLevels[1].name} copy`, id: '33' },
        ...testLevels.slice(2),
      ],
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

  it('Should handle the RETRIEVE_LEVELS action', () => {
    expect(
      reducer(levelManagerInitialState, {
        type: RETRIEVE_LEVELS,
      }),
    ).toEqual({
      ...levelManagerInitialState,
      loading: true,
    });
  });

  it('Should handle the RETRIEVE_LEVELS_FULFILLED action', () => {
    expect(
      reducer(levelManagerInitialState, {
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
      reducer(levelManagerInitialState, {
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
});

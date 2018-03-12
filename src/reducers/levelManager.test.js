import reducer, { initialState as levelManagerInitialState } from './levelManager';
import { initialState as levelEditorInitialState } from '../reducers/levelEditor';
import {
  SELECT_LEVEL,
  CREATE_LEVEL,
  LOAD_LEVEL,
  SAVE_LEVEL,
  DELETE_LEVEL,
  COPY_LEVEL,
  RETRIEVE_LEVELS,
  RETRIEVE_LEVELS_FULFILLED,
} from '../actions/levelManager';
import testLevels from '../data/testLevels';

describe('The level manager reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(levelManagerInitialState);
  });

  it('Should handle the SELECT_LEVEL action', () => {
    expect(
      reducer(undefined, {
        type: SELECT_LEVEL,
        selectedLevelId: testLevels[0].id,
      }),
    ).toEqual({
      ...levelManagerInitialState,
      selectedLevelId: testLevels[0].id,
    });
  });

  it('Should handle the CREATE_LEVEL action', () => {
    expect(
      reducer(undefined, {
        type: CREATE_LEVEL,
        newId: '1337',
      }),
    ).toEqual({
      ...levelManagerInitialState,
      levels: [
        ...levelManagerInitialState.levels,
        {
          id: '1337',
          name: 'New level',
          tiles: levelEditorInitialState.tiles,
        },
      ],
      selectedLevelId: '1337',
      currentLevelId: '1337',
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
});

import reducer, { initialState } from './levelManager';
import {
  SELECT_LEVEL,
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
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('Should handle the SELECT_LEVEL action', () => {
    expect(
      reducer(undefined, {
        type: SELECT_LEVEL,
        selectedLevelId: testLevels[0].id,
      }),
    ).toEqual({
      ...initialState,
      selectedLevelId: testLevels[0].id,
    });
  });

  it('Should handle the LOAD_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          selectedLevelId: testLevels[0].id,
        },
        {
          type: LOAD_LEVEL,
          levelId: testLevels[0].id,
          tiles: testLevels[0].tiles,
        },
      ),
    ).toEqual({
      ...initialState,
      selectedLevelId: testLevels[0].id,
      currentLevelId: testLevels[0].id,
    });
  });

  it('Should handle the SAVE_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
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
      ...initialState,
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
          ...initialState,
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
        {
          type: DELETE_LEVEL,
        },
      ),
    ).toEqual({
      ...initialState,
      selectedLevelId: null,
      levels: [...testLevels.slice(0, 1), ...testLevels.slice(2)],
    });
  });

  it('Should handle the COPY_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
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
      ...initialState,
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
      reducer(initialState, {
        type: RETRIEVE_LEVELS,
      }),
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('Should handle the RETRIEVE_LEVELS_FULFILLED action', () => {
    expect(
      reducer(initialState, {
        type: RETRIEVE_LEVELS_FULFILLED,
        levels: testLevels,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      loaded: true,
      error: false,
      levels: testLevels,
    });
  });
});

import reducer, { initialState } from './levelManager';
import {
  SELECT_LEVEL,
  LOAD_LEVEL,
  SAVE_LEVEL,
  DELETE_LEVEL,
  COPY_LEVEL,
} from '../actions/levelManager';

describe('The level manager reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('Should handle the SELECT_LEVEL action', () => {
    expect(
      reducer(undefined, {
        type: SELECT_LEVEL,
        selectedLevelId: 3,
      }),
    ).toEqual({
      ...initialState,
      selectedLevelId: 3,
    });
  });

  it('Should handle the LOAD_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          selectedLevelId: 3,
        },
        {
          type: LOAD_LEVEL,
          levelId: 3,
          tiles: [1, 2, 3],
        },
      ),
    ).toEqual({
      ...initialState,
      selectedLevelId: 3,
      currentLevelId: 3,
    });
  });

  it('Should handle the SAVE_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          selectedLevelId: 2,
          currentLevelId: null,
          levels: [
            {
              id: 1,
              name: 'Test level 1',
              tiles: [1, 2, 3],
            },
            {
              id: 2,
              name: 'Test level 2',
              tiles: [4, 5, 6],
            },
          ],
        },
        {
          type: SAVE_LEVEL,
          levelId: 2,
          tiles: [7, 8, 9],
        },
      ),
    ).toEqual({
      ...initialState,
      selectedLevelId: 2,
      currentLevelId: 2,
      levels: [
        {
          id: 1,
          name: 'Test level 1',
          tiles: [1, 2, 3],
        },
        {
          id: 2,
          name: 'Test level 2',
          tiles: [7, 8, 9],
        },
      ],
    });
  });

  it('Should handle the DELETE_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          selectedLevelId: 2,
          levels: [
            {
              id: 1,
              name: 'Test level 1',
              tiles: [1, 2, 3],
            },
            {
              id: 2,
              name: 'Test level 2',
              tiles: [4, 5, 6],
            },
            {
              id: 3,
              name: 'Test level 3',
              tiles: [6, 7, 8],
            },
          ],
        },
        {
          type: DELETE_LEVEL,
        },
      ),
    ).toEqual({
      ...initialState,
      selectedLevelId: null,
      levels: [
        {
          id: 1,
          name: 'Test level 1',
          tiles: [1, 2, 3],
        },
        {
          id: 3,
          name: 'Test level 3',
          tiles: [6, 7, 8],
        },
      ],
    });
  });

  it('Should handle the COPY_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          selectedLevelId: 1,
          currentLevelId: 1,
          levels: [
            {
              id: 1,
              name: 'Test level 1',
              tiles: [1, 2, 3],
            },
            {
              id: 2,
              name: 'Test level 2',
              tiles: [4, 5, 6],
            },
          ],
        },
        {
          type: COPY_LEVEL,
          newId: 3,
        },
      ),
    ).toEqual({
      ...initialState,
      selectedLevelId: 3,
      currentLevelId: 3,
      levels: [
        {
          id: 1,
          name: 'Test level 1',
          tiles: [1, 2, 3],
        },
        {
          id: 3,
          name: 'Test level 1 copy',
          tiles: [1, 2, 3],
        },
        {
          id: 2,
          name: 'Test level 2',
          tiles: [4, 5, 6],
        },
      ],
    });
  });
});

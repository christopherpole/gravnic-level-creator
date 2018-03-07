import reducer, { initialState } from './levelManager';
import { SELECT_LEVEL, LOAD_LEVEL } from '../actions/levelManager';

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
});

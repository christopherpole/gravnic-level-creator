import { MOVE_DOWN, MOVE_LEFT } from 'gravnic-game';

import { UPDATE_TILE, RESET_GRID } from 'levelEditor/actions';
import { LOAD_LEVEL_CONFIRMED } from 'levelManager/actions';
import { FIND_QUICKEST_SOLUTION } from 'api/actions';
import reducer, { initialState } from './reducer';

describe('UPDATE_TILE', () => {
  it('Handles the action correctly', () => {
    expect(
      reducer(
        {
          ...initialState,
          solving: true,
          loading: true,
          loaded: true,
          solution: [],
          maxMoves: 10,
          error: true,
        },
        {
          type: UPDATE_TILE,
        },
      ),
    ).toEqual(initialState);
  });
});

describe('RESET_GRID', () => {
  it('Handles the action correctly', () => {
    expect(
      reducer(
        {
          ...initialState,
          solving: true,
          loading: true,
          loaded: true,
          solution: [],
          maxMoves: 10,
          error: true,
        },
        {
          type: RESET_GRID,
        },
      ),
    ).toEqual(initialState);
  });
});

describe('FIND_QUICKEST_SOLUTION.PENDING', () => {
  it('Handles the action correctly', () => {
    expect(
      reducer(
        { ...initialState, error: true, solved: true, solution: [] },
        {
          type: FIND_QUICKEST_SOLUTION.PENDING,
        },
      ),
    ).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });
});

describe('FIND_QUICKEST_SOLUTION.FULFILLED', () => {
  it('Handles the action correctly', () => {
    expect(
      reducer(
        {
          ...initialState,
          error: true,
          loading: true,
        },
        {
          type: FIND_QUICKEST_SOLUTION.FULFILLED,
          payload: {
            solved: true,
            solution: [MOVE_DOWN, MOVE_LEFT],
            maxMoves: 10,
          },
        },
      ),
    ).toEqual({
      ...initialState,
      loading: false,
      error: false,
      loaded: true,
      solution: [MOVE_DOWN, MOVE_LEFT],
      maxMoves: 10,
    });
  });
});

describe('FIND_QUICKEST_SOLUTION.REJECTED', () => {
  it('Handles the action correctly', () => {
    expect(
      reducer(
        {
          ...initialState,
          loading: true,
        },
        {
          type: FIND_QUICKEST_SOLUTION.REJECTED,
        },
      ),
    ).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
});

describe('LOAD_LEVEL_CONFIRMED', () => {
  it('Handles the action correctly', () => {
    expect(
      reducer(
        {
          ...initialState,
        },
        {
          type: LOAD_LEVEL_CONFIRMED,
          level: {
            solution: [MOVE_LEFT],
            maxMoves: 4,
          },
        },
      ),
    ).toEqual({
      ...initialState,
      solution: [MOVE_LEFT],
      maxMoves: 4,
    });
  });
});

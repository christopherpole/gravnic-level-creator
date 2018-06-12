import { MOVE_DOWN, MOVE_LEFT } from 'gravnic-game';

import { EDIT_LEVEL } from 'levelPreview/actions';
import { FIND_QUICKEST_SOLUTION } from 'api/actions';
import reducer, { initialState } from './reducer';
import { SOLVE_LEVEL } from './actions';

describe('SOLVE_LEVEL', () => {
  it('Handles the action correctly', () => {
    expect(
      reducer(undefined, {
        type: SOLVE_LEVEL,
      }),
    ).toEqual({
      ...initialState,
      solving: true,
    });
  });
});

describe('EDIT_LEVEL', () => {
  it('Handles the action correctly', () => {
    expect(
      reducer(
        { ...initialState, solving: true },
        {
          type: EDIT_LEVEL,
        },
      ),
    ).toEqual({
      ...initialState,
      solving: false,
    });
  });
});

describe('FIND_QUICKEST_SOLUTION.PENDING', () => {
  it('Handles the action correctly', () => {
    expect(
      reducer(
        { ...initialState, error: true, result: { solved: true } },
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
            result: { solved: true, solution: [MOVE_DOWN, MOVE_LEFT], maxMoves: 10 },
          },
        },
      ),
    ).toEqual({
      ...initialState,
      loading: false,
      error: false,
      result: { solved: true, solution: [MOVE_DOWN, MOVE_LEFT], maxMoves: 10 },
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

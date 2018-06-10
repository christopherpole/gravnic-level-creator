import { EDIT_LEVEL } from 'levelPreview/actions';
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

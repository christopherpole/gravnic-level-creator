import { SOLVE_LEVEL, solveLevel } from './actions';

describe('solveLevel()', () => {
  it('Creates the correct action', () => {
    const expectedAction = {
      type: SOLVE_LEVEL,
    };

    expect(solveLevel()).toEqual(expectedAction);
  });
});

import { SOLVE_LEVEL, FIND_QUICKEST_SOLUTION, solveLevel, findQuickestSolution } from './actions';

describe('solveLevel()', () => {
  it('Creates the correct action', () => {
    const expectedAction = {
      type: SOLVE_LEVEL,
    };

    expect(solveLevel()).toEqual(expectedAction);
  });
});

describe('findQuickestSolution()', () => {
  it('Creates the correct action', () => {
    const expectedAction = {
      type: FIND_QUICKEST_SOLUTION,
    };

    expect(findQuickestSolution()).toEqual(expectedAction);
  });
});

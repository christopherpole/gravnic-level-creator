import { makeActionCreator } from 'utils';

export const SOLVE_LEVEL = 'SOLVE_LEVEL';
export const FIND_QUICKEST_SOLUTION = 'FIND_QUICKEST_SOLUTION';

export const solveLevel = makeActionCreator(SOLVE_LEVEL);
export const findQuickestSolution = makeActionCreator(FIND_QUICKEST_SOLUTION);

import { spy } from 'sinon';
import { convertEditorTilesToGameState } from 'utils';

import testLevels from 'data/testLevels';
import availableTiles from 'config/tiles';
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
    const fn = findQuickestSolution();
    const dispatchSpy = spy();
    const getState = () => ({
      levelEditor: {
        tiles: testLevels[0].tiles,
        availableTiles,
      },
    });

    expect(typeof fn).toBe('function');
    fn(dispatchSpy, getState);
    expect(dispatchSpy.calledOnce).toBe(true);
    expect(
      dispatchSpy.calledWith({
        type: FIND_QUICKEST_SOLUTION,
        gameState: convertEditorTilesToGameState(testLevels[0].tiles, availableTiles),
      }),
    ).toBe(true);
  });
});

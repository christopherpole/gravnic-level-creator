import { spy } from 'sinon';
import { convertEditorTilesToGameState } from 'utils';

import testLevels from 'data/testLevels';
import availableTiles from 'config/tiles';
import {
  SOLVE_LEVEL,
  CANCEL_SOLVE_LEVEL,
  SOLVE_LEVEL_CANCELED,
  solveLevel,
  cancelSolveLevel,
  solveLevelCanceled,
} from './actions';

describe('solveLevel()', () => {
  it('Creates the correct action', () => {
    const fn = solveLevel();
    const dispatchSpy = spy();
    const getState = () => ({
      levelEditor: {
        tiles: testLevels[0].tiles,
        links: [],
        availableTiles,
      },
    });

    expect(typeof fn).toBe('function');
    fn(dispatchSpy, getState);
    expect(dispatchSpy.calledOnce).toBe(true);
    expect(
      dispatchSpy.calledWith({
        type: SOLVE_LEVEL,
        gameState: convertEditorTilesToGameState(testLevels[0].tiles, availableTiles, []),
      }),
    ).toBe(true);
  });
});

describe('cancelSolveLevel()', () => {
  it('Creates the correct action', () => {
    const expectedAction = {
      type: CANCEL_SOLVE_LEVEL,
    };

    expect(cancelSolveLevel()).toEqual(expectedAction);
  });
});

describe('solveLevelCanceled()', () => {
  it('Creates the correct action', () => {
    const expectedAction = {
      type: SOLVE_LEVEL_CANCELED,
    };

    expect(solveLevelCanceled()).toEqual(expectedAction);
  });
});

import { spy } from 'sinon';
import { convertEditorTilesToGameState } from 'utils';

import testLevels from 'data/testLevels';
import availableTiles from 'config/tiles';
import { SOLVE_LEVEL, solveLevel } from './actions';

describe('solveLevel()', () => {
  it('Creates the correct action', () => {
    const fn = solveLevel();
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
        type: SOLVE_LEVEL,
        gameState: convertEditorTilesToGameState(testLevels[0].tiles, availableTiles),
      }),
    ).toBe(true);
  });
});

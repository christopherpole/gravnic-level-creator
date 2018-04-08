import { MOVE_LEFT, changeGravityDirection, convertTilesToGameState } from 'gravnic-game';
import { spy } from 'sinon';

import { MAKE_MOVE, makeMove } from './levelPreview';
import testLevels from '../data/testLevels';

describe('The level preview actions', () => {
  it('Should create an action to make a move', () => {
    const gameState = convertTilesToGameState(testLevels[0]);
    const newGameStates = changeGravityDirection(gameState, MOVE_LEFT);
    const fn = makeMove(MOVE_LEFT);
    const dispatchSpy = spy();
    const getState = () => ({
      levelPreview: {
        gameState,
      },
    });

    expect(typeof fn).toBe('function');
    fn(dispatchSpy, getState);
    expect(dispatchSpy.calledOnce).toBe(true);
    expect(
      dispatchSpy.calledWith({
        type: MAKE_MOVE,
        gameState: newGameStates[newGameStates.length - 1],
      }),
    ).toBe(true);
  });
});

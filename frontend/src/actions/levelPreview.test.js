import { spy } from 'sinon';
import { MOVE_LEFT, convertTilesToGameState } from 'gravnic-game';
import testLevels from '../data/testLevels';

import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  CHANGE_GRAVITY_DIRECTION,
  UPDATE_GAME_STATE,
  ENTITIES_STOPPED_MOVING,
  previewLevel,
  editLevel,
  changeGravityDirection,
  updateGameState,
  entitiesStoppedMoving,
} from './levelPreview';

describe('The level preview actions', () => {
  it('Should create an action to preview a level', () => {
    const fn = previewLevel();
    const dispatchSpy = spy();
    const getState = () => ({
      levelEditor: {
        tiles: testLevels[0].tiles,
      },
    });

    expect(typeof fn).toBe('function');
    fn(dispatchSpy, getState);
    expect(dispatchSpy.calledOnce).toBe(true);
    expect(
      dispatchSpy.calledWith({
        type: PREVIEW_LEVEL,
        gameState: convertTilesToGameState(testLevels[0].tiles),
      }),
    ).toBe(true);
  });

  it('Should create an action to edit the level', () => {
    const expectedAction = {
      type: EDIT_LEVEL,
    };

    expect(editLevel()).toEqual(expectedAction);
  });

  it('Should create an action to change the direction of gravity', () => {
    const expectedAction = {
      type: CHANGE_GRAVITY_DIRECTION,
      direction: MOVE_LEFT,
    };

    expect(changeGravityDirection(MOVE_LEFT)).toEqual(expectedAction);
  });

  it('Should create an action to update the current game state', () => {
    const expectedAction = {
      type: UPDATE_GAME_STATE,
      gameState: [1, 2, 3],
    };

    expect(updateGameState([1, 2, 3])).toEqual(expectedAction);
  });

  it('Should create an action to signify that the entities have stopped moving', () => {
    const expectedAction = {
      type: ENTITIES_STOPPED_MOVING,
    };

    expect(entitiesStoppedMoving()).toEqual(expectedAction);
  });
});

import { MOVE_LEFT } from 'gravnic-game';

import {
  CHANGE_GRAVITY_DIRECTION,
  UPDATE_GAME_STATE,
  ENTITIES_STOPPED_MOVING,
  changeGravityDirection,
  updateGameState,
  entitiesStoppedMoving,
} from './levelPreview';

describe('The level preview actions', () => {
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

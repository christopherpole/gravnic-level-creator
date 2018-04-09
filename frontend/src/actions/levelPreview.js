export const CHANGE_GRAVITY_DIRECTION = 'CHANGE_GRAVITY_DIRECTION';
export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';
export const ENTITIES_STOPPED_MOVING = 'ENTITIES_STOPPED_MOVING';

export const changeGravityDirection = direction => ({
  type: CHANGE_GRAVITY_DIRECTION,
  direction,
});

export const updateGameState = gameState => ({
  type: UPDATE_GAME_STATE,
  gameState,
});

export const entitiesStoppedMoving = () => ({
  type: ENTITIES_STOPPED_MOVING,
});

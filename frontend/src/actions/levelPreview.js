import { convertTilesToGameState } from 'gravnic-game';

export const CHANGE_GRAVITY_DIRECTION = 'CHANGE_GRAVITY_DIRECTION';
export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';
export const ENTITIES_STOPPED_MOVING = 'ENTITIES_STOPPED_MOVING';
export const PREVIEW_LEVEL = 'PREVIEW_LEVEL';
export const EDIT_LEVEL = 'EDIT_LEVEL';

export const previewLevel = () => (dispatch, getState) => {
  const { tiles } = getState().levelEditor;
  const gameState = convertTilesToGameState(tiles);

  dispatch({
    type: PREVIEW_LEVEL,
    gameState,
  });
};

export const editLevel = () => ({
  type: EDIT_LEVEL,
});

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

import { convertTilesToGameState } from 'gravnic-game';
import { makeActionCreator } from '../utils';

export const CHANGE_GRAVITY_DIRECTION = 'CHANGE_GRAVITY_DIRECTION';
export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';
export const ENTITIES_STOPPED_MOVING = 'ENTITIES_STOPPED_MOVING';
export const PREVIEW_LEVEL = 'PREVIEW_LEVEL';
export const EDIT_LEVEL = 'EDIT_LEVEL';
export const RESTART_LEVEL = 'RESTART_LEVEL';
export const UNDO_MOVE = 'UNDO_MOVE';
export const SET_GAME_SPEED = 'SET_GAME_SPEED';

export const editLevel = makeActionCreator(EDIT_LEVEL);
export const restartLevel = makeActionCreator(RESTART_LEVEL);
export const changeGravityDirection = makeActionCreator(CHANGE_GRAVITY_DIRECTION, 'direction');
export const updateGameState = makeActionCreator(UPDATE_GAME_STATE, 'gameState');
export const entitiesStoppedMoving = makeActionCreator(ENTITIES_STOPPED_MOVING);
export const undoMove = makeActionCreator(UNDO_MOVE);
export const setGameSpeed = makeActionCreator(SET_GAME_SPEED, 'gameSpeed');

export const previewLevel = () => (dispatch, getState) => {
  const { tiles } = getState().levelEditor;
  const gameState = convertTilesToGameState(tiles);

  dispatch({
    type: PREVIEW_LEVEL,
    gameState,
  });
};

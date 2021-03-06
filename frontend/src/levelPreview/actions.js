import { makeActionCreator, convertEditorTilesToGameState } from 'utils';

export const MAKE_MOVE = 'MAKE_MOVE';
export const SET_GAME_STATE = 'SET_GAME_STATE';
export const MAKE_MOVE_FINISHED = 'MAKE_MOVE_FINISHED';
export const PREVIEW_LEVEL = 'PREVIEW_LEVEL';
export const EDIT_LEVEL = 'EDIT_LEVEL';
export const RESTART_LEVEL = 'RESTART_LEVEL';
export const UNDO_MOVE = 'UNDO_MOVE';
export const UNDO_MOVE_FINISHED = 'UNDO_MOVE_FINISHED';
export const SET_GAME_SPEED = 'SET_GAME_SPEED';
export const SET_FAST_MODE = 'SET_FAST_MODE';

export const editLevel = makeActionCreator(EDIT_LEVEL);
export const restartLevel = makeActionCreator(RESTART_LEVEL);
export const setGameState = makeActionCreator(SET_GAME_STATE, 'gameState');
export const makeMoveFinished = makeActionCreator(
  MAKE_MOVE_FINISHED,
  'gameStates',
  'levelComplete',
);
export const undoMove = makeActionCreator(UNDO_MOVE);
export const undoMoveFinished = makeActionCreator(UNDO_MOVE_FINISHED);
export const setGameSpeed = makeActionCreator(SET_GAME_SPEED, 'gameSpeed');
export const setFastMode = makeActionCreator(SET_FAST_MODE, 'fastMode');

export const makeMove = direction => (dispatch, getState) => {
  const { entitiesMoving, gravityDirection, levelComplete } = getState().levelPreview;

  //  Don't create the action if entities are moving or the gravity is
  //  already going in the given direction
  if (entitiesMoving || levelComplete || direction === gravityDirection) return;

  dispatch({
    type: MAKE_MOVE,
    direction,
  });
};

export const previewLevel = () => (dispatch, getState) => {
  const { tiles, availableTiles, links } = getState().levelEditor;
  const gameState = convertEditorTilesToGameState(tiles, availableTiles, links);

  dispatch({
    type: PREVIEW_LEVEL,
    gameState,
  });
};

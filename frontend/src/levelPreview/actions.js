import { convertTilesToGameState } from 'gravnic-game';
import { makeActionCreator } from 'utils';

export const MAKE_MOVE = 'MAKE_MOVE';
export const MAKE_MOVE_STEP = 'MAKE_MOVE_STEP';
export const MAKE_MOVE_FINISHED = 'MAKE_MOVE_FINISHED';
export const PREVIEW_LEVEL = 'PREVIEW_LEVEL';
export const EDIT_LEVEL = 'EDIT_LEVEL';
export const RESTART_LEVEL = 'RESTART_LEVEL';
export const UNDO_MOVE = 'UNDO_MOVE';
export const UNDO_MOVE_STEP = 'UNDO_MOVE_STEP';
export const UNDO_MOVE_FINISHED = 'UNDO_MOVE_FINISHED';
export const SET_GAME_SPEED = 'SET_GAME_SPEED';

export const editLevel = makeActionCreator(EDIT_LEVEL);
export const restartLevel = makeActionCreator(RESTART_LEVEL);
export const makeMove = makeActionCreator(MAKE_MOVE, 'direction');
export const makeMoveStep = makeActionCreator(MAKE_MOVE_STEP, 'gameState');
export const makeMoveFinished = makeActionCreator(MAKE_MOVE_FINISHED);
export const undoMove = makeActionCreator(UNDO_MOVE);
export const undoMoveStep = makeActionCreator(UNDO_MOVE_STEP);
export const undoMoveFinished = makeActionCreator(UNDO_MOVE_FINISHED);
export const setGameSpeed = makeActionCreator(SET_GAME_SPEED, 'gameSpeed');

export const previewLevel = () => (dispatch, getState) => {
  const { tiles } = getState().levelEditor;
  const gameState = convertTilesToGameState(tiles);

  dispatch({
    type: PREVIEW_LEVEL,
    gameState,
  });
};

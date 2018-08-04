import { makeActionCreator, convertEditorTilesToGameState } from 'utils';

export const SOLVE_LEVEL = 'SOLVE_LEVEL';
export const CANCEL_SOLVE_LEVEL = 'CANCEL_SOLVE_LEVEL';
export const SOLVE_LEVEL_CANCELED = 'SOLVE_LEVEL_CANCELED';

export const solveLevel = () => (dispatch, getState) => {
  const { tiles, availableTiles, links } = getState().levelEditor;
  const gameState = convertEditorTilesToGameState(tiles, availableTiles, links);

  dispatch({
    type: SOLVE_LEVEL,
    gameState,
  });
};

export const cancelSolveLevel = makeActionCreator(CANCEL_SOLVE_LEVEL);
export const solveLevelCanceled = makeActionCreator(SOLVE_LEVEL_CANCELED);

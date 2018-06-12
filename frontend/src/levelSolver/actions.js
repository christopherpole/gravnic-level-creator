import { makeActionCreator, convertEditorTilesToGameState } from 'utils';

export const SOLVE_LEVEL = 'SOLVE_LEVEL';
export const FIND_QUICKEST_SOLUTION = 'FIND_QUICKEST_SOLUTION';

export const solveLevel = makeActionCreator(SOLVE_LEVEL);

export const findQuickestSolution = () => (dispatch, getState) => {
  const { tiles, availableTiles } = getState().levelEditor;
  const gameState = convertEditorTilesToGameState(tiles, availableTiles);

  dispatch({
    type: FIND_QUICKEST_SOLUTION,
    gameState,
  });
};

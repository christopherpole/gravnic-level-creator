import { convertEditorTilesToGameState } from 'utils';

export const SOLVE_LEVEL = 'SOLVE_LEVEL';

export const solveLevel = () => (dispatch, getState) => {
  const { tiles, availableTiles } = getState().levelEditor;
  const gameState = convertEditorTilesToGameState(tiles, availableTiles);

  dispatch({
    type: SOLVE_LEVEL,
    gameState,
  });
};

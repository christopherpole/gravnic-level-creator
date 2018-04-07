import Gravnic from 'gravnic-game';

export const UPDATE_TILE = 'UPDATE_TILE';
export const SELECT_TILE = 'SELECT_TILE';
export const RESET_GRID = 'RESET_GRID';
export const EDIT_LEVEL = 'EDIT_LEVEL';
export const PREVIEW_LEVEL = 'PREVIEW_LEVEL';
export const START_DRAG = 'START_DRAG';
export const STOP_DRAG = 'STOP_DRAG';
export const SET_STARS = 'SET_STARS';

export const selectTile = selectedTileId => ({
  type: SELECT_TILE,
  selectedTileId,
});

export const updateTile = position => ({
  type: UPDATE_TILE,
  position,
});

export const previewLevel = () => (dispatch, getState) => {
  const { tiles } = getState().levelEditor;
  const gravnic = new Gravnic();
  const gameState = gravnic.loadTiles(tiles);

  dispatch({
    type: PREVIEW_LEVEL,
    gameState,
  });
};

export const editLevel = () => ({
  type: EDIT_LEVEL,
});

export const resetGrid = () => ({
  type: RESET_GRID,
});

export const startDrag = () => ({
  type: START_DRAG,
});

export const stopDrag = () => ({
  type: STOP_DRAG,
});

export const setStars = (starsIndex, stars) => ({
  type: SET_STARS,
  starsIndex,
  stars,
});

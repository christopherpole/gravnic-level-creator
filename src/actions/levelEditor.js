export const UPDATE_TILE = 'UPDATE_TILE';
export const SELECT_TILE = 'SELECT_TILE';
export const RESET_GRID = 'RESET_GRID';
export const EDIT_LEVEL = 'EDIT_LEVEL';
export const PREVIEW_LEVEL = 'PREVIEW_LEVEL';

export const selectTile = selectedTileId => ({
  type: SELECT_TILE,
  selectedTileId,
});

export const updateTile = position => ({
  type: UPDATE_TILE,
  position,
});

export const previewLevel = () => ({
  type: PREVIEW_LEVEL,
});

export const editLevel = () => ({
  type: EDIT_LEVEL,
});

export const resetGrid = () => ({
  type: RESET_GRID,
});

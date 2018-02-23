export const UPDATE_TILE = 'UPDATE_TILE';
export const SELECT_TILE = 'SELECT_TILE';

export const selectTile = selectedTileId => ({
  type: SELECT_TILE,
  selectedTileId,
});

export const updateTile = position => ({
  type: UPDATE_TILE,
  position,
});

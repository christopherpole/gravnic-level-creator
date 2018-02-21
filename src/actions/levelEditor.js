export const UPDATE_TILE = 'UPDATE_TILE';

export const updateTile = (pos, tileId) => ({
  type: UPDATE_TILE,
  pos,
  tileId,
});

import { makeActionCreator } from 'utils';

export const SELECT_TILE = 'SELECT_TILE';
export const UPDATE_TILE = 'UPDATE_TILE';
export const RESET_GRID = 'RESET_GRID';
export const START_DRAG = 'START_DRAG';
export const STOP_DRAG = 'STOP_DRAG';
export const SET_STARS = 'SET_STARS';

export const selectTile = makeActionCreator(SELECT_TILE, 'selectedTileId');
export const resetGrid = makeActionCreator(RESET_GRID);
export const stopDrag = makeActionCreator(STOP_DRAG);
export const setStars = makeActionCreator(SET_STARS, 'starsIndex', 'stars');

export const startDrag = position => (dispatch, getState) => {
  const { tiles, availableTiles } = getState().levelEditor;
  let linkFromTilePos = null;

  //  If the selected tile's entity is linkable then pass that on to the reducer
  const { selectedTileId } = tiles.find(tile => tile.position === position);
  const { linkable } = availableTiles.find(
    availableTile => availableTile.id === selectedTileId,
  ).entity;

  if (linkable) {
    linkFromTilePos = position;
  }

  dispatch({
    type: START_DRAG,
    linkFromTilePos,
  });
};

export const updateTile = (position, explicitlyPlaced = false) => (dispatch, getState) => {
  const { selectedTileId, tiles, dragging, linkFromTilePos } = getState().levelEditor;
  const selectedTile = tiles.find(tile => tile.position === position);

  if (
    (selectedTile.selectedTileId !== selectedTileId && explicitlyPlaced) ||
    (dragging && !(dragging && linkFromTilePos))
  ) {
    dispatch({
      type: UPDATE_TILE,
      position,
    });
  }
};

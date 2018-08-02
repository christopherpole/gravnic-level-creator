import { makeActionCreator } from 'utils';

export const SELECT_TILE = 'SELECT_TILE';
export const UPDATE_TILE = 'UPDATE_TILE';
export const RESET_GRID = 'RESET_GRID';
export const START_DRAG = 'START_DRAG';
export const STOP_DRAG = 'STOP_DRAG';
export const SET_STARS = 'SET_STARS';
export const SET_LINK_TO_TILE_POS = 'SET_LINK_TO_TILE_POS';
export const CREATE_LINK = 'CREATE_LINK';

export const selectTile = makeActionCreator(SELECT_TILE, 'selectedTileId');
export const resetGrid = makeActionCreator(RESET_GRID);
export const setStars = makeActionCreator(SET_STARS, 'starsIndex', 'stars');
export const createLink = makeActionCreator(CREATE_LINK);
export const updateTile = makeActionCreator(UPDATE_TILE, 'position');

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

export const stopDrag = () => (dispatch, getState) => {
  const { tiles, links, availableTiles, linkFromTilePos, linkToTilePos } = getState().levelEditor;

  //  Create an action for creating a link if linking different tiles...
  if (linkFromTilePos && linkToTilePos && linkFromTilePos !== linkToTilePos) {
    //  Check that the link doesn't already exist
    const linkExists = links.find(
      link =>
        (link.from === linkFromTilePos && link.to === linkToTilePos) ||
        (link.from === linkToTilePos && link.to === linkFromTilePos),
    );

    const linkTargetTileId = tiles.find(tile => tile.position === linkToTilePos).selectedTileId;
    const linkTargetIsLinkable = availableTiles.find(
      availableTile => availableTile.id === linkTargetTileId,
    ).entity.linkable;

    if (!linkExists && linkTargetIsLinkable) {
      dispatch({
        type: CREATE_LINK,
      });
    }
  }

  //  ALways dispatch the action to stop dragging
  dispatch({
    type: STOP_DRAG,
  });
};

export const mouseoverTile = position => (dispatch, getState) => {
  const { selectedTileId, dragging, tiles, linkFromTilePos } = getState().levelEditor;
  const selectedTile = tiles.find(tile => tile.position === position);

  if (linkFromTilePos) {
    dispatch({
      type: SET_LINK_TO_TILE_POS,
      position,
    });
  } else if (dragging && selectedTile.selectedTileId !== selectedTileId) {
    dispatch({
      type: UPDATE_TILE,
      position,
    });
  }
};

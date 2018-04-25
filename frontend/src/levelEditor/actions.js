import { makeActionCreator } from 'utils';

export const SELECT_TILE = 'SELECT_TILE';
export const UPDATE_TILE = 'UPDATE_TILE';
export const RESET_GRID = 'RESET_GRID';
export const START_DRAG = 'START_DRAG';
export const STOP_DRAG = 'STOP_DRAG';
export const SET_STARS = 'SET_STARS';

export const selectTile = makeActionCreator(SELECT_TILE, 'selectedTileId');
export const updateTile = makeActionCreator(UPDATE_TILE, 'position');
export const resetGrid = makeActionCreator(RESET_GRID);
export const startDrag = makeActionCreator(START_DRAG);
export const stopDrag = makeActionCreator(STOP_DRAG);
export const setStars = makeActionCreator(SET_STARS, 'starsIndex', 'stars');

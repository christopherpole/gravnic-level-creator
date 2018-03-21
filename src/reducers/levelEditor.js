import {
  UPDATE_TILE,
  SELECT_TILE,
  EDIT_LEVEL,
  PREVIEW_LEVEL,
  RESET_GRID,
  START_DRAG,
  STOP_DRAG,
} from '../actions/levelEditor';
import { LOAD_LEVEL } from '../actions/levelManager';
import { createNewLevel } from '../utils';

export const initialState = {
  previewing: false,
  dragging: false,
  selectedTileId: 0,
  tiles: createNewLevel().tiles,
};

export default function levelEditorReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_TILE: {
      return {
        ...state,
        selectedTileId: action.selectedTileId,
      };
    }

    case UPDATE_TILE: {
      const newTiles = state.tiles.slice();
      newTiles[action.position] = {
        ...newTiles[action.position],
        selectedTileId: state.selectedTileId,
      };

      return {
        ...state,
        tiles: newTiles,
      };
    }

    case PREVIEW_LEVEL: {
      return {
        ...state,
        previewing: true,
      };
    }

    case EDIT_LEVEL: {
      return {
        ...state,
        previewing: false,
      };
    }

    case RESET_GRID: {
      return {
        ...state,
        tiles: initialState.tiles,
      };
    }

    case LOAD_LEVEL: {
      return {
        ...state,
        tiles: action.level.tiles,
      };
    }

    case START_DRAG: {
      return {
        ...state,
        dragging: true,
      };
    }

    case STOP_DRAG: {
      return {
        ...state,
        dragging: false,
      };
    }

    default: {
      return state;
    }
  }
}

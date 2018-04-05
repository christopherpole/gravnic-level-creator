import deepEqual from 'deep-equal';

import {
  UPDATE_TILE,
  SELECT_TILE,
  EDIT_LEVEL,
  PREVIEW_LEVEL,
  RESET_GRID,
  START_DRAG,
  STOP_DRAG,
  SET_STARS,
} from '../actions/levelEditor';
import { SAVE_LEVEL, LOAD_LEVEL_CONFIRMED } from '../actions/levelManager';
import { createNewLevel } from '../utils';
import { MIN_MOVES, MAX_MOVES } from '../config/settings';

const newLevel = createNewLevel();

export const initialState = {
  previewing: false,
  dragging: false,
  selectedTileId: 0,
  tiles: newLevel.tiles,
  stars: newLevel.stars,
  editedSinceLastSave: false,
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
        editedSinceLastSave: true,
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
        editedSinceLastSave: false,
      };
    }

    case SAVE_LEVEL: {
      return {
        ...state,
        editedSinceLastSave: false,
      };
    }

    case LOAD_LEVEL_CONFIRMED: {
      return {
        ...state,
        tiles: action.level.tiles,
        stars: action.level.stars,
        editedSinceLastSave: false,
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

    case SET_STARS: {
      const first = [...state.stars.slice(0, action.starsIndex)].map(noOfMoves =>
        Math.min(noOfMoves, action.stars),
      );

      const rest = [...state.stars.slice(action.starsIndex + 1)].map(noOfMoves =>
        Math.max(noOfMoves, action.stars),
      );

      //  Ensure values are between 1 and 99
      const arr = [...first, action.stars, ...rest].map(val => {
        if (val < MIN_MOVES) return MIN_MOVES;
        if (val > MAX_MOVES) return MAX_MOVES;
        return val;
      });

      return {
        ...state,
        stars: arr,
        editedSinceLastSave: true,
      };
    }

    default: {
      return state;
    }
  }
}

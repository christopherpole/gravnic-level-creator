import {
  UPDATE_TILE,
  SELECT_TILE,
  EDIT_LEVEL,
  PREVIEW_LEVEL,
  RESET_GRID,
} from '../actions/levelEditor';
import { Grid } from '../components/levelEditor/grid';

export const initialState = {
  previewing: false,
  selectedTileId: 0,
  tiles: [...Array(Grid.SIZE * Grid.SIZE)].map((_, index) => ({
    position: index,
    selectedTileId: 0,
  })),
};

export default function userReducer(state = initialState, action) {
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

    default: {
      return state;
    }
  }
}

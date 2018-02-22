import { UPDATE_TILE, SELECT_TILE } from '../actions/levelEditor';
import { Grid } from '../components/levelEditor/grid';

export const initialState = {
  selectedTileId: null,
  tiles: [...Array(Grid.SIZE * Grid.SIZE)].map((_, index) => ({
    position: index,
    selectedTileId: null,
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
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}

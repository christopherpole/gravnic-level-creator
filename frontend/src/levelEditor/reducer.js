import availableTiles from 'config/tiles';
import { SAVE_LEVEL, LOAD_LEVEL_CONFIRMED } from 'levelManager/actions';
import { createNewLevel } from 'utils';
import { MIN_MOVES, MAX_MOVES } from 'config/settings';
import {
  UPDATE_TILE,
  SELECT_TILE,
  RESET_GRID,
  START_DRAG,
  STOP_DRAG,
  SET_STARS,
  SET_LINK_TO_TILE_POS,
  CREATE_LINK,
} from './actions';

const newLevel = createNewLevel();

export const initialState = {
  previewing: false,
  dragging: false,
  linkFromTilePos: null,
  linkToTilePos: null,
  selectedTileId: availableTiles[0].id,
  availableTiles,
  tiles: newLevel.tiles,
  stars: newLevel.stars,
  editedSinceLastSave: false,
  links: [],
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

      const newLinks = state.links.filter(
        link => link.from !== action.position && link.to !== action.position,
      );

      return {
        ...state,
        tiles: newTiles,
        editedSinceLastSave: true,
        links: newLinks,
      };
    }

    case RESET_GRID: {
      return {
        ...state,
        tiles: initialState.tiles,
        editedSinceLastSave: false,
        links: initialState.links,
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
        links: action.level.links,
      };
    }

    case START_DRAG: {
      return {
        ...state,
        dragging: true,
        linkFromTilePos: action.linkFromTilePos,
      };
    }

    case STOP_DRAG: {
      const links = [...state.links];

      return {
        ...state,
        dragging: false,
        linkFromTilePos: null,
        linkToTilePos: null,
        links,
      };
    }

    case SET_LINK_TO_TILE_POS: {
      return {
        ...state,
        dragging: false,
        linkToTilePos: action.position,
      };
    }

    case CREATE_LINK: {
      return {
        ...state,
        linkFromTilePos: state.linkFromTilePos,
        linkToTilePos: state.linkToTilePos,
        links: [...state.links, { from: state.linkFromTilePos, to: state.linkToTilePos }],
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

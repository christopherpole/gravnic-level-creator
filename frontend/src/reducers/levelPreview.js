import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  CHANGE_GRAVITY_DIRECTION,
  UPDATE_GAME_STATE,
  ENTITIES_STOPPED_MOVING,
} from '../actions/levelPreview';

export const initialState = {
  previewing: false,
  gameState: null,
  gravityDirection: null,
  entitiesMoving: false,
  gameHistory: [],
};

export default function levelPreviewReducer(state = initialState, action) {
  switch (action.type) {
    case PREVIEW_LEVEL: {
      return {
        ...state,
        previewing: true,
        gameState: action.gameState,
      };
    }

    case EDIT_LEVEL: {
      return {
        ...state,
        previewing: false,
      };
    }

    case CHANGE_GRAVITY_DIRECTION: {
      const newGameHistory = [...state.gameHistory];
      newGameHistory.push([]);

      return {
        ...state,
        gravityDirection: action.direction,
        entitiesMoving: true,
        gameHistory: newGameHistory,
      };
    }

    case UPDATE_GAME_STATE: {
      const newGameHistory = [...state.gameHistory];
      newGameHistory[newGameHistory.length - 1].push(action.gameState);

      return {
        ...state,
        gameState: action.gameState,
        gameHistory: newGameHistory,
      };
    }

    case ENTITIES_STOPPED_MOVING: {
      return {
        ...state,
        entitiesMoving: false,
      };
    }

    default: {
      return state;
    }
  }
}

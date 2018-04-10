import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  CHANGE_GRAVITY_DIRECTION,
  UPDATE_GAME_STATE,
  ENTITIES_STOPPED_MOVING,
  RESTART_LEVEL,
  UNDO_MOVE,
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
        gameHistory: [action.gameState],
        entitiesMoving: initialState.entitiesMoving,
        gravityDirection: initialState.gravityDirection,
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
      newGameHistory.push([state.gameState]);

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

    case RESTART_LEVEL: {
      return {
        ...state,
        entitiesMoving: initialState.entitiesMoving,
        gameHistory: [action.gameState],
        gravityDirection: initialState.gravityDirection,
        gameState: action.gameState,
      };
    }

    case UNDO_MOVE: {
      if (state.gameHistory.length <= 1) return state;

      const newGameHistory = state.gameHistory.slice(0, state.gameHistory.length - 1);

      return {
        ...state,
        gameState: state.gameHistory[state.gameHistory.length - 1][0],
        gameHistory: newGameHistory,
      };
    }

    default: {
      return state;
    }
  }
}

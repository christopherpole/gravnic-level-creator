import { DEFAULT_GAME_SPEED, FAST_GAME_MODIFIER } from 'config/settings';

import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  SET_GAME_STATE,
  MAKE_MOVE,
  MAKE_MOVE_FINISHED,
  RESTART_LEVEL,
  UNDO_MOVE,
  UNDO_MOVE_FINISHED,
  SET_GAME_SPEED,
  SET_FAST_MODE,
} from './actions';

export const initialState = {
  previewing: false,
  gameState: null,
  gravityDirection: null,
  entitiesMoving: false,
  gameHistory: [],
  moveHistory: [],
  gameSpeed: DEFAULT_GAME_SPEED,
  fastMode: false,
};

export default function levelPreviewReducer(state = initialState, action) {
  switch (action.type) {
    case PREVIEW_LEVEL: {
      return {
        ...state,
        previewing: true,
        gameState: action.gameState,
        gameHistory: [[action.gameState]],
        moveHistory: [],
        entitiesMoving: false,
        gravityDirection: null,
      };
    }

    case EDIT_LEVEL: {
      return {
        ...state,
        previewing: false,
      };
    }

    case MAKE_MOVE: {
      return {
        ...state,
        gravityDirection: action.direction,
        entitiesMoving: true,
        moveHistory: [...state.moveHistory, action.direction],
      };
    }

    case SET_GAME_STATE: {
      return {
        ...state,
        gameState: action.gameState,
      };
    }

    case MAKE_MOVE_FINISHED: {
      const newGameHistory = [...state.gameHistory];

      newGameHistory.push([
        newGameHistory[newGameHistory.length - 1][
          newGameHistory[newGameHistory.length - 1].length - 1
        ],
        ...action.gameStates,
      ]);

      return {
        ...state,
        entitiesMoving: false,
        gameHistory: newGameHistory,
      };
    }

    case RESTART_LEVEL: {
      return {
        ...state,
        entitiesMoving: false,
        gameHistory: [[...state.gameHistory[0]]],
        gravityDirection: null,
        gameState: [...state.gameHistory[0][0]],
        moveHistory: [],
      };
    }

    case UNDO_MOVE: {
      return {
        ...state,
        entitiesMoving: true,
        moveHistory: state.moveHistory.slice(0, state.moveHistory.length - 1),
      };
    }

    case UNDO_MOVE_FINISHED: {
      return {
        ...state,
        gameHistory: state.gameHistory.slice(0, state.gameHistory.length - 1),
        entitiesMoving: false,
      };
    }

    case SET_GAME_SPEED: {
      const gameSpeed = state.fastMode ? action.gameSpeed * FAST_GAME_MODIFIER : action.gameSpeed;

      return {
        ...state,
        gameSpeed,
      };
    }

    case SET_FAST_MODE: {
      const gameSpeed = action.fastMode
        ? state.gameSpeed * FAST_GAME_MODIFIER
        : state.gameSpeed / FAST_GAME_MODIFIER;

      return {
        ...state,
        fastMode: action.fastMode,
        gameSpeed,
      };
    }

    default: {
      return state;
    }
  }
}

import { cloneDeep } from 'lodash';
import { GAME_SPEED_NORMAL } from 'config/settings';

import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  MAKE_MOVE,
  MAKE_MOVE_STEP,
  MAKE_MOVE_FINISHED,
  RESTART_LEVEL,
  UNDO_MOVE,
  UNDO_MOVE_STEP,
  UNDO_MOVE_FINISHED,
  SET_GAME_SPEED,
} from './actions';

export const initialState = {
  previewing: false,
  gameState: null,
  gravityDirection: null,
  entitiesMoving: false,
  gameHistory: [],
  gameSpeed: GAME_SPEED_NORMAL,
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

    case MAKE_MOVE: {
      const newGameHistory = cloneDeep(state.gameHistory);
      newGameHistory.push([cloneDeep(state.gameState)]);

      return {
        ...state,
        gravityDirection: action.direction,
        entitiesMoving: true,
        gameHistory: newGameHistory,
      };
    }

    case MAKE_MOVE_STEP: {
      const newGameHistory = cloneDeep(state.gameHistory);
      newGameHistory[newGameHistory.length - 1].push(action.gameState);

      return {
        ...state,
        gameState: action.gameState,
        gameHistory: newGameHistory,
      };
    }

    case MAKE_MOVE_FINISHED: {
      return {
        ...state,
        entitiesMoving: false,
      };
    }

    case RESTART_LEVEL: {
      return {
        ...state,
        entitiesMoving: initialState.entitiesMoving,
        gameHistory: [cloneDeep(state.gameHistory[0])],
        gravityDirection: initialState.gravityDirection,
        gameState: cloneDeep(state.gameHistory[0]),
      };
    }

    case UNDO_MOVE: {
      return {
        ...state,
        entitiesMoving: true,
      };
    }

    case UNDO_MOVE_STEP: {
      const gameHistoryLength = state.gameHistory.length - 1;
      const latestMoveLength = state.gameHistory[gameHistoryLength].length;

      //  Don't undo any further if we're at the initial step for this move
      if (latestMoveLength <= 1) return state;

      //  Remove the last step from the most recent move for the game history
      const newGameHistory = cloneDeep([
        ...state.gameHistory.slice(0, gameHistoryLength),
        state.gameHistory[gameHistoryLength].slice(0, latestMoveLength - 1),
      ]);

      //  Get the previous step from the most recent move
      const newGameState = cloneDeep(state.gameHistory[gameHistoryLength][latestMoveLength - 2]);

      return {
        ...state,
        gameState: newGameState,
        gameHistory: newGameHistory,
      };
    }

    case UNDO_MOVE_FINISHED: {
      return {
        ...state,
        gameHistory: cloneDeep(state.gameHistory.slice(0, state.gameHistory.length - 1)),
        entitiesMoving: false,
      };
    }

    case SET_GAME_SPEED: {
      return {
        ...state,
        gameSpeed: action.gameSpeed,
      };
    }

    default: {
      return state;
    }
  }
}

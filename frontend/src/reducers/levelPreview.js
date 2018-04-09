import { PREVIEW_LEVEL } from '../actions/levelEditor';
import {
  CHANGE_GRAVITY_DIRECTION,
  UPDATE_GAME_STATE,
  ENTITIES_STOPPED_MOVING,
} from '../actions/levelPreview';

export const initialState = {
  gameState: null,
  gravityDirection: null,
  entitiesMoving: false,
};

export default function levelPreviewReducer(state = initialState, action) {
  switch (action.type) {
    case PREVIEW_LEVEL: {
      return {
        ...state,
        gameState: action.gameState,
      };
    }

    case CHANGE_GRAVITY_DIRECTION: {
      return {
        ...state,
        gravityDirection: action.direction,
        entitiesMoving: true,
      };
    }

    case UPDATE_GAME_STATE: {
      return {
        ...state,
        gameState: action.gameState,
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

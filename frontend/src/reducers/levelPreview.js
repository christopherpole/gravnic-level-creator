import { PREVIEW_LEVEL } from '../actions/levelEditor';
import { MAKE_MOVE } from '../actions/levelPreview';

export const initialState = {
  gameState: null,
};

export default function levelPreviewReducer(state = initialState, action) {
  switch (action.type) {
    case MAKE_MOVE:
    case PREVIEW_LEVEL: {
      return {
        ...state,
        gameState: action.gameState,
      };
    }

    default: {
      return state;
    }
  }
}

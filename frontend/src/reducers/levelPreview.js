import { PREVIEW_LEVEL } from '../actions/levelEditor';

export const initialState = {
  gameState: null,
};

export default function levelPreviewReducer(state = initialState, action) {
  switch (action.type) {
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

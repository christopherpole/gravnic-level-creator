import { EDIT_LEVEL } from 'levelPreview/actions';
import { SOLVE_LEVEL } from './actions';

export const initialState = {
  solving: false,
};

export default function levelSolverReducer(state = initialState, action) {
  switch (action.type) {
    case SOLVE_LEVEL: {
      return {
        ...state,
        solving: true,
      };
    }

    case EDIT_LEVEL: {
      return {
        ...state,
        solving: false,
      };
    }

    default: {
      return state;
    }
  }
}

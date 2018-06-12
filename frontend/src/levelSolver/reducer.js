import { EDIT_LEVEL } from 'levelPreview/actions';
import { FIND_QUICKEST_SOLUTION } from 'api/actions';
import { SOLVE_LEVEL } from './actions';

export const initialState = {
  solving: false,
  loading: false,
  error: false,
  result: null,
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

    case FIND_QUICKEST_SOLUTION.PENDING: {
      return {
        ...state,
        error: false,
        loading: true,
        result: null,
      };
    }

    case FIND_QUICKEST_SOLUTION.FULFILLED: {
      return {
        ...state,
        error: false,
        loading: false,
        result: action.payload.result,
      };
    }

    case FIND_QUICKEST_SOLUTION.REJECTED: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

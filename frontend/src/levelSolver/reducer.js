import { EDIT_LEVEL } from 'levelPreview/actions';
import { FIND_QUICKEST_SOLUTION } from 'api/actions';
import { SOLVE_LEVEL } from './actions';

export const initialState = {
  solving: false,
  loading: false,
  loaded: false,
  solution: null,
  maxMoves: null,
  error: false,
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
        ...initialState,
        solving: state.solving,
        loading: true,
      };
    }

    case FIND_QUICKEST_SOLUTION.FULFILLED: {
      return {
        ...state,
        error: false,
        loading: false,
        loaded: true,
        solution: action.payload.solution,
        maxMoves: action.payload.maxMoves,
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

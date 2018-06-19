import { UPDATE_TILE, RESET_GRID } from 'levelEditor/actions';
import { LOAD_LEVEL_CONFIRMED } from 'levelManager/actions';
import { FIND_QUICKEST_SOLUTION } from 'api/actions';

export const initialState = {
  loading: false,
  loaded: false,
  solution: null,
  maxMoves: null,
  error: false,
};

export default function levelSolverReducer(state = initialState, action) {
  switch (action.type) {
    case FIND_QUICKEST_SOLUTION.PENDING: {
      return {
        ...initialState,
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

    case LOAD_LEVEL_CONFIRMED: {
      return {
        ...state,
        solution: action.level.solution,
        maxMoves: action.level.maxMoves,
      };
    }

    case RESET_GRID:
    case UPDATE_TILE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

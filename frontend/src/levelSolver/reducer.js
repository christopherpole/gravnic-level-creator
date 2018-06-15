import { EDIT_LEVEL } from 'levelPreview/actions';
import { UPDATE_TILE, RESET_GRID } from 'levelEditor/actions';
import { LOAD_LEVEL_CONFIRMED } from 'levelManager/actions';
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

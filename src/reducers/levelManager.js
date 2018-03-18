import {
  SELECT_LEVEL,
  CREATE_NEW_LEVEL,
  LOAD_LEVEL,
  SAVE_LEVEL,
  COPY_LEVEL,
  DELETE_LEVEL,
  BEGIN_RENAME_LEVEL,
  CHANGE_RENAME_LEVEL,
  FINISH_RENAME_LEVEL,
} from '../actions/levelManager';
import {
  RETRIEVE_LEVELS_PENDING,
  RETRIEVE_LEVELS_FULFILLED,
  RETRIEVE_LEVELS_REJECTED,
  CREATE_LEVEL_FULFILLED,
  CREATE_LEVEL_REJECTED,
  UPDATE_LEVEL_FULFILLED,
  UPDATE_LEVEL_REJECTED,
  DELETE_LEVEL_REJECTED,
} from '../actions/apiActions';

export const initialState = {
  currentLevelId: null,
  selectedLevelId: null,
  renamingLevelId: null,
  renamingLevelName: null,
  loading: false,
  loaded: false,
  error: false,
  levels: [],
};

export default function levelManagerReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_LEVEL: {
      return {
        ...state,
        selectedLevelId: action.selectedLevelId,
        renamingLevelId: null,
        renamingLevelName: null,
      };
    }

    case COPY_LEVEL:
    case CREATE_NEW_LEVEL: {
      return {
        ...state,
        currentLevelId: action.level.id,
        selectedLevelId: action.level.id,
        renamingLevelId: action.level.id,
        renamingLevelName: action.level.name,
        levels: [...state.levels, action.level],
      };
    }

    case CREATE_LEVEL_FULFILLED: {
      const levelIndex = state.levels.findIndex(level => level.id === action.oldLevel.id);

      return {
        ...state,
        selectedLevelId: action.newLevel.id,
        currentLevelId: action.newLevel.id,
        renamingLevelId: state.renamingLevelId !== null ? action.newLevel.id : null,
        levels: [
          ...state.levels.slice(0, levelIndex),
          action.newLevel,
          ...state.levels.slice(levelIndex + 1),
        ],
      };
    }

    case CREATE_LEVEL_REJECTED: {
      return {
        ...state,
        error: true,
        loaded: false,
      };
    }

    case SAVE_LEVEL:
    case UPDATE_LEVEL_FULFILLED: {
      const levelIndex = state.levels.findIndex(level => level.id === action.level.id);
      return {
        ...state,
        levels: [
          ...state.levels.slice(0, levelIndex),
          action.level,
          ...state.levels.slice(levelIndex + 1),
        ],
      };
    }

    case UPDATE_LEVEL_REJECTED: {
      return {
        ...state,
        error: true,
        loaded: false,
      };
    }

    case LOAD_LEVEL: {
      return {
        ...state,
        currentLevelId: action.levelId,
      };
    }

    case DELETE_LEVEL: {
      return {
        ...state,
        levels: [...state.levels].filter(level => level.id !== action.id),
        selectedLevelId: null,
      };
    }

    case DELETE_LEVEL_REJECTED: {
      return {
        ...state,
        loaded: false,
        error: true,
      };
    }

    case BEGIN_RENAME_LEVEL: {
      return {
        ...state,
        selectedLevelId: state.selectedLevelId,
        renamingLevelId: state.selectedLevelId,
        renamingLevelName: state.levels.find(level => level.id === state.selectedLevelId).name,
      };
    }

    case CHANGE_RENAME_LEVEL: {
      return {
        ...state,
        renamingLevelName: action.name,
      };
    }

    case FINISH_RENAME_LEVEL: {
      const newLevels = state.levels.slice(0);
      newLevels.find(level => level.id === state.renamingLevelId).name = state.renamingLevelName;

      return {
        ...state,
        levels: newLevels,
        renamingLevelId: null,
        renamingLevelName: null,
      };
    }

    case RETRIEVE_LEVELS_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }

    case RETRIEVE_LEVELS_FULFILLED: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        levels: action.levels,
      };
    }

    case RETRIEVE_LEVELS_REJECTED: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
      };
    }

    default: {
      return state;
    }
  }
}

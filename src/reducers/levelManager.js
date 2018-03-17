import {
  SELECT_LEVEL,
  CREATE_LEVEL,
  LOAD_LEVEL,
  SAVE_LEVEL,
  DELETE_LEVEL,
  COPY_LEVEL,
  BEGIN_RENAME_LEVEL,
  CHANGE_RENAME_LEVEL,
  FINISH_RENAME_LEVEL,
  RETRIEVE_LEVELS,
  RETRIEVE_LEVELS_FULFILLED,
  RETRIEVE_LEVELS_REJECTED,
} from '../actions/levelManager';

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

    case CREATE_LEVEL: {
      return {
        ...state,
        currentLevelId: action.level.id,
        selectedLevelId: action.level.id,
        renamingLevelId: action.level.id,
        renamingLevelName: action.level.name,
        levels: [...state.levels, action.level],
      };
    }

    case LOAD_LEVEL: {
      return {
        ...state,
        currentLevelId: action.levelId,
      };
    }

    case SAVE_LEVEL: {
      return {
        ...state,
        currentLevelId: action.levelId,
        levels: [...state.levels].map(level => {
          if (level.id === action.levelId) {
            return { ...level, tiles: action.tiles };
          }
          return level;
        }),
      };
    }

    case DELETE_LEVEL: {
      return {
        ...state,
        levels: [...state.levels].filter(level => level.id !== state.selectedLevelId),
        selectedLevelId: null,
      };
    }

    case COPY_LEVEL: {
      const newLevels = [...state.levels];
      const newLevelIndex = newLevels.findIndex(level => level.id === state.selectedLevelId);
      const newLevel = { ...newLevels[newLevelIndex] };
      newLevel.id = action.newId;
      newLevel.name += ' copy';
      newLevels.splice(newLevelIndex + 1, 0, newLevel);

      return {
        ...state,
        levels: newLevels,
        selectedLevelId: action.newId,
        currentLevelId: action.newId,
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

    case RETRIEVE_LEVELS: {
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

import {
  SELECT_LEVEL,
  LOAD_LEVEL,
  SAVE_LEVEL,
  DELETE_LEVEL,
  COPY_LEVEL,
} from '../actions/levelManager';

export const initialState = {
  currentLevelId: null,
  selectedLevelId: null,
  levels: [
    {
      id: '1',
      name: 'Test level 1',
      tiles: [...Array(100)].map((_, index) => ({
        position: index,
        selectedTileId: 0,
      })),
    },
    {
      id: '2',
      name: 'Test level 2',
      tiles: [...Array(100)].map((_, index) => ({
        position: index,
        selectedTileId: Math.floor(Math.random() * 8),
      })),
    },
    {
      id: '3',
      name: 'Test level 3',
      tiles: [...Array(100)].map((_, index) => ({
        position: index,
        selectedTileId: 2,
      })),
    },
  ],
};

export default function levelManagerReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_LEVEL: {
      return {
        ...state,
        selectedLevelId: action.selectedLevelId,
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

    default: {
      return state;
    }
  }
}

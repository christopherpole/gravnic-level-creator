import shortid from 'shortid';

import Grid from '../components/levelEditor/grid';

export const SELECT_LEVEL = 'SELECT_LEVEL';
export const CREATE_LEVEL = 'CREATE_LEVEL';
export const CREATE_LEVEL_PENDING = 'CREATE_LEVEL_PENDING';
export const CREATE_LEVEL_FULFILLED = 'CREATE_LEVEL_FULFILLED';
export const CREATE_LEVEL_REJECTED = 'CREATE_LEVEL_REJECTED';
export const LOAD_LEVEL = 'LOAD_LEVEL';
export const SAVE_LEVEL = 'SAVE_LEVEL';
export const DELETE_LEVEL = 'DELETE_LEVEL';
export const COPY_LEVEL = 'COPY_LEVEL';
export const BEGIN_RENAME_LEVEL = 'BEGIN_RENAME_LEVEL';
export const CHANGE_RENAME_LEVEL = 'CHANGE_RENAME_LEVEL';
export const FINISH_RENAME_LEVEL = 'FINISH_RENAME_LEVEL';
export const RETRIEVE_LEVELS = 'RETRIEVE_LEVELS';
export const RETRIEVE_LEVELS_PENDING = 'RETRIEVE_LEVELS_PENDING';
export const RETRIEVE_LEVELS_FULFILLED = 'RETRIEVE_LEVELS_FULFILLED';
export const RETRIEVE_LEVELS_REJECTED = 'RETRIEVE_LEVELS_REJECTED';

export const selectLevel = selectedLevelId => ({
  type: SELECT_LEVEL,
  selectedLevelId,
});

export const createLevel = () => ({
  type: CREATE_LEVEL,
  level: {
    id: shortid.generate(),
    name: 'New level',
    tiles: [...Array(Grid.SIZE * Grid.SIZE)].map((_, index) => ({
      position: index,
      selectedTileId: 0,
    })),
  },
});

export const createLevelPending = () => ({
  type: CREATE_LEVEL_PENDING,
});

export const createLevelFulfilled = level => ({
  type: CREATE_LEVEL_FULFILLED,
  level,
});

export const createLevelRejected = error => ({
  type: CREATE_LEVEL_REJECTED,
  error,
});

export const loadLevel = () => (dispatch, getState) => {
  const levelId = getState().levelManager.selectedLevelId;
  const { tiles } = getState().levelManager.levels.find(level => level.id === levelId);

  dispatch({
    type: LOAD_LEVEL,
    levelId,
    tiles,
  });
};

export const saveLevel = () => (dispatch, getState) => {
  const levelId = getState().levelManager.selectedLevelId;
  const { tiles } = getState().levelEditor;

  dispatch({
    type: SAVE_LEVEL,
    levelId,
    tiles,
  });
};

export const deleteLevel = () => ({
  type: DELETE_LEVEL,
});

export const copyLevel = () => ({
  type: COPY_LEVEL,
  newId: shortid.generate(),
});

export const beginRenameLevel = () => ({
  type: BEGIN_RENAME_LEVEL,
});

export const changeRenameLevel = name => ({
  type: CHANGE_RENAME_LEVEL,
  name,
});

export const finishRenameLevel = () => ({
  type: FINISH_RENAME_LEVEL,
});

export const retrieveLevels = () => ({
  type: RETRIEVE_LEVELS,
});

export const retrieveLevelsPending = () => ({
  type: RETRIEVE_LEVELS_PENDING,
});

export const retrieveLevelsFulfilled = levels => ({
  type: RETRIEVE_LEVELS_FULFILLED,
  levels,
});

export const retrieveLevelsRejected = error => ({
  type: RETRIEVE_LEVELS_REJECTED,
  error,
});

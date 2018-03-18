import shortid from 'shortid';

export const SELECT_LEVEL = 'SELECT_LEVEL';
export const CREATE_LEVEL = 'CREATE_LEVEL';
export const CREATE_LEVEL_PENDING = 'CREATE_LEVEL_PENDING';
export const CREATE_LEVEL_FULFILLED = 'CREATE_LEVEL_FULFILLED';
export const CREATE_LEVEL_REJECTED = 'CREATE_LEVEL_REJECTED';
export const LOAD_LEVEL = 'LOAD_LEVEL';
export const SAVE_LEVEL = 'SAVE_LEVEL';
export const DELETE_LEVEL = 'DELETE_LEVEL';
export const DELETE_LEVEL_PENDING = 'DELETE_LEVEL_PENDING';
export const DELETE_LEVEL_FULFILLED = 'DELETE_LEVEL_FULFILLED';
export const DELETE_LEVEL_REJECTED = 'DELETE_LEVEL_REJECTED';
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
});

export const createLevelPending = level => ({
  type: CREATE_LEVEL_PENDING,
  level,
});

export const createLevelFulfilled = (oldLevel, newLevel) => ({
  type: CREATE_LEVEL_FULFILLED,
  oldLevel,
  newLevel,
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

export const deleteLevelPending = id => ({
  type: DELETE_LEVEL_PENDING,
  id,
});

export const deleteLevelFulfilled = level => ({
  type: DELETE_LEVEL_FULFILLED,
  level,
});

export const deleteLevelRejected = error => ({
  type: DELETE_LEVEL_REJECTED,
  error,
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

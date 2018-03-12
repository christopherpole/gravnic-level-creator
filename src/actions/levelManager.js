import shortid from 'shortid';

export const SELECT_LEVEL = 'SELECT_LEVEL';
export const LOAD_LEVEL = 'LOAD_LEVEL';
export const SAVE_LEVEL = 'SAVE_LEVEL';
export const DELETE_LEVEL = 'DELETE_LEVEL';
export const COPY_LEVEL = 'COPY_LEVEL';
export const RETRIEVE_LEVELS = 'RETRIEVE_LEVELS';
export const RETRIEVE_LEVELS_PENDING = 'RETRIEVE_LEVELS_PENDING';
export const RETRIEVE_LEVELS_FULFILLED = 'RETRIEVE_LEVELS_FULFILLED';
export const RETRIEVE_LEVELS_REJECTED = 'RETRIEVE_LEVELS_REJECTED';

export const selectLevel = selectedLevelId => ({
  type: SELECT_LEVEL,
  selectedLevelId,
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

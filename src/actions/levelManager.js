import shortid from 'shortid';

export const SELECT_LEVEL = 'SELECT_LEVEL';
export const LOAD_LEVEL = 'LOAD_LEVEL';
export const SAVE_LEVEL = 'SAVE_LEVEL';
export const DELETE_LEVEL = 'DELETE_LEVEL';
export const COPY_LEVEL = 'COPY_LEVEL';

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

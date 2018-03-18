import shortid from 'shortid';

export const RETRIEVE_LEVELS = 'RETRIEVE_LEVELS';
export const SELECT_LEVEL = 'SELECT_LEVEL';
export const CREATE_NEW_LEVEL = 'CREATE_NEW_LEVEL';
export const LOAD_LEVEL = 'LOAD_LEVEL';
export const SAVE_LEVEL = 'SAVE_LEVEL';
export const DELETE_LEVEL = 'DELETE_LEVEL';
export const COPY_LEVEL = 'COPY_LEVEL';
export const BEGIN_RENAME_LEVEL = 'BEGIN_RENAME_LEVEL';
export const CHANGE_RENAME_LEVEL = 'CHANGE_RENAME_LEVEL';
export const FINISH_RENAME_LEVEL = 'FINISH_RENAME_LEVEL';

export const retrieveLevels = () => ({
  type: RETRIEVE_LEVELS,
});

export const selectLevel = selectedLevelId => ({
  type: SELECT_LEVEL,
  selectedLevelId,
});

export const createNewLevel = () => dispatch => {
  const level = {
    id: shortid.generate(),
    name: 'New level',
    tiles: [...Array(100)].map((_, index) => ({
      position: index,
      selectedTileId: 0,
    })),
  };

  dispatch({
    type: CREATE_NEW_LEVEL,
    level,
  });
};

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
  const selectedLevel = getState().levelManager.levels.find(
    level => level.id === getState().levelManager.selectedLevelId,
  );
  const { tiles } = getState().levelEditor;

  dispatch({
    type: SAVE_LEVEL,
    level: { ...selectedLevel, tiles },
  });
};

export const deleteLevel = () => (dispatch, getState) => {
  const { selectedLevelId } = getState().levelManager;

  dispatch({
    type: DELETE_LEVEL,
    id: selectedLevelId,
  });
};

export const copyLevel = () => (dispatch, getState) => {
  const selectedLevel = getState().levelManager.levels.find(
    level => level.id === getState().levelManager.selectedLevelId,
  );

  dispatch({
    type: COPY_LEVEL,
    level: { ...selectedLevel, id: shortid.generate() },
  });
};

export const beginRenameLevel = () => ({
  type: BEGIN_RENAME_LEVEL,
});

export const changeRenameLevel = name => ({
  type: CHANGE_RENAME_LEVEL,
  name,
});

export const finishRenameLevel = () => (dispatch, getState) => {
  const selectedLevel = getState().levelManager.levels.find(
    level => level.id === getState().levelManager.selectedLevelId,
  );
  const name = getState().levelManager.renamingLevelName;

  dispatch({
    type: FINISH_RENAME_LEVEL,
    level: { ...selectedLevel, name },
  });
};

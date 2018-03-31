import shortid from 'shortid';

import { createNewLevel as utilsCreateNewLevel } from '../utils';

export const RETRIEVE_LEVELS = 'RETRIEVE_LEVELS';
export const SELECT_LEVEL = 'SELECT_LEVEL';
export const CREATE_NEW_LEVEL = 'CREATE_NEW_LEVEL';
export const LOAD_LEVEL = 'LOAD_LEVEL';
export const SAVE_LEVEL = 'SAVE_LEVEL';
export const DELETE_SELECTED_LEVEL = 'DELETE_SELECTED_LEVEL';
export const COPY_LEVEL = 'COPY_LEVEL';
export const BEGIN_RENAME_LEVEL = 'BEGIN_RENAME_LEVEL';
export const CHANGE_RENAME_LEVEL = 'CHANGE_RENAME_LEVEL';
export const FINISH_RENAME_LEVEL = 'FINISH_RENAME_LEVEL';

export const retrieveLevels = () => ({
  type: RETRIEVE_LEVELS,
});

export const selectLevel = id => ({
  type: SELECT_LEVEL,
  id,
});

export const createNewLevel = () => {
  const level = utilsCreateNewLevel();

  return {
    type: CREATE_NEW_LEVEL,
    level,
  };
};

export const loadLevel = () => (dispatch, getState) => {
  const currentLevel = getState().levelManager.levels.find(
    level => level.id === getState().levelManager.selectedLevelId,
  );

  dispatch({
    type: LOAD_LEVEL,
    level: currentLevel,
  });
};

export const saveLevel = () => (dispatch, getState) => {
  const selectedLevel = getState().levelManager.levels.find(
    level => level.id === getState().levelManager.selectedLevelId,
  );
  const { tiles, stars } = getState().levelEditor;

  dispatch({
    type: SAVE_LEVEL,
    level: { ...selectedLevel, tiles, stars },
  });
};

export const deleteSelectedLevel = () => (dispatch, getState) => {
  const { selectedLevelId } = getState().levelManager;

  dispatch({
    type: DELETE_SELECTED_LEVEL,
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
    level => level.id === getState().levelManager.renamingLevelId,
  );
  const name = getState().levelManager.renamingLevelName;

  dispatch({
    type: FINISH_RENAME_LEVEL,
    level: { ...selectedLevel, name },
  });
};

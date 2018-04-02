import shortid from 'shortid';
import { arrayMove } from 'react-sortable-hoc';

import { createNewLevel as utilsCreateNewLevel } from '../utils';
import { getHighestPositionValue } from '../selectors';

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
export const REORDER_LEVELS = 'REORDER_LEVELS';

export const retrieveLevels = () => ({
  type: RETRIEVE_LEVELS,
});

export const selectLevel = id => ({
  type: SELECT_LEVEL,
  id,
});

export const createNewLevel = () => (dispatch, getState) => {
  const level = utilsCreateNewLevel(getHighestPositionValue(getState()) + 1);

  dispatch({
    type: CREATE_NEW_LEVEL,
    level,
  });
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
    level: {
      ...selectedLevel,
      id: shortid.generate(),
      position: getHighestPositionValue(getState()) + 1,
    },
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

export const reorderLevels = (oldIndex, newIndex) => (dispatch, getState) => {
  const { levels } = getState().levelManager;

  const sortedLevels = arrayMove(levels, oldIndex, newIndex).map((level, index) => ({
    ...level,
    position: index + 1,
  }));

  dispatch({
    type: REORDER_LEVELS,
    levels: sortedLevels,
  });
};

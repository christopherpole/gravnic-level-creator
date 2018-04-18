import shortid from 'shortid';
import { arrayMove } from 'react-sortable-hoc';
import { createNewLevel as utilsCreateNewLevel, makeActionCreator } from '../utils';
import { getHighestPositionValue } from '../selectors';

export const RETRIEVE_LEVELS = 'RETRIEVE_LEVELS';
export const SELECT_LEVEL = 'SELECT_LEVEL';
export const CREATE_NEW_LEVEL = 'CREATE_NEW_LEVEL';
export const LOAD_LEVEL = 'LOAD_LEVEL';
export const LOAD_LEVEL_CONFIRMED = 'LOAD_LEVEL_CONFIRMED';
export const SAVE_LEVEL = 'SAVE_LEVEL';
export const DELETE_SELECTED_LEVEL = 'DELETE_SELECTED_LEVEL';
export const DELETE_SELECTED_LEVEL_CONFIRMED = 'DELETE_SELECTED_LEVEL_CONFIRMED';
export const COPY_LEVEL = 'COPY_LEVEL';
export const BEGIN_RENAME_LEVEL = 'BEGIN_RENAME_LEVEL';
export const CHANGE_RENAME_LEVEL = 'CHANGE_RENAME_LEVEL';
export const FINISH_RENAME_LEVEL = 'FINISH_RENAME_LEVEL';
export const REORDER_LEVELS = 'REORDER_LEVELS';
export const SHOW_CONFIRMATION_SCREEN = 'SHOW_CONFIRMATION_SCREEN';
export const CANCEL_CONFIRMATION = 'CANCEL_CONFIRMATION';
export const CONFIRM_CONFIRMATION = 'CONFIRM_CONFIRMATION';

export const retrieveLevels = makeActionCreator(RETRIEVE_LEVELS);
export const selectLevel = makeActionCreator(SELECT_LEVEL, 'id');
export const loadLevelConfirmed = makeActionCreator(LOAD_LEVEL_CONFIRMED, 'level');
export const deleteSelectedLevelConfirmed = makeActionCreator(
  DELETE_SELECTED_LEVEL_CONFIRMED,
  'id',
);
export const beginRenameLevel = makeActionCreator(BEGIN_RENAME_LEVEL);
export const changeRenameLevel = makeActionCreator(CHANGE_RENAME_LEVEL, 'name');
export const showConfirmationScreen = makeActionCreator(SHOW_CONFIRMATION_SCREEN, 'message');
export const cancelConfirmation = makeActionCreator(CANCEL_CONFIRMATION);
export const confirmConfirmation = makeActionCreator(CONFIRM_CONFIRMATION);

export const createNewLevel = () => (dispatch, getState) => {
  const level = utilsCreateNewLevel(getHighestPositionValue(getState()) + 1);

  dispatch({
    type: CREATE_NEW_LEVEL,
    level,
  });
};

export const loadLevel = () => (dispatch, getState) => {
  const { editedSinceLastSave } = getState().levelEditor;
  const currentLevel = getState().levelManager.levels.find(
    level => level.id === getState().levelManager.selectedLevelId,
  );

  if (editedSinceLastSave) {
    dispatch({
      type: LOAD_LEVEL,
      level: currentLevel,
      message: 'Any unsaved changes will be lost. Proceed?',
    });
  } else {
    dispatch(loadLevelConfirmed(currentLevel));
  }
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
    message: 'Are you sure you want to permanently delete this level?',
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

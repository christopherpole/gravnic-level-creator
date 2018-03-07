export const SELECT_LEVEL = 'SELECT_LEVEL';
export const LOAD_LEVEL = 'LOAD_LEVEL';

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

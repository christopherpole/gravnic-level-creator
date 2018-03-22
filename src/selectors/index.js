import { createSelector } from 'reselect';

/**
 * Determines which of the level manager buttons should be disabled
 * @param {Object} levelEditor - The state of the level editor
 * @param {Object} levelManager - The state of the level manager
 * @returns {Object} An object of booleans for each of the buttons
 */
export const getLevelManagerButtonDisabledStates = createSelector(
  [state => state.levelEditor, state => state.levelManager],
  (levelEditor, levelManager) => {
    //  If no level is selected, only the "new" button is enabled by default
    const buttonsDisabledStates = {
      btnNew: false,
      btnLoad: true,
      btnSave: true,
      btnDelete: true,
      btnCopy: true,
      btnRename: true,
    };

    if (levelManager.selectedLevelId) {
      //  Enable all buttons if a level is selected
      ['btnNew', 'btnLoad', 'btnSave', 'btnDelete', 'btnCopy', 'btnRename'].forEach(key => {
        buttonsDisabledStates[key] = false;
      });

      //  Disable the "save" button if no changes have been made from the level editor
      const selectedLevel = levelManager.levels.find(
        level => level.id === levelManager.selectedLevelId,
      );

      if (
        selectedLevel &&
        JSON.stringify(levelEditor.tiles) === JSON.stringify(selectedLevel.tiles)
      ) {
        buttonsDisabledStates.btnSave = true;
        buttonsDisabledStates.btnLoad = true;
      }
    }

    //  Disable every button except for the rename button if the level is being renamed
    if (levelManager.renamingLevelName && levelManager.renamingLevelId) {
      ['btnNew', 'btnLoad', 'btnSave', 'btnDelete', 'btnCopy'].forEach(key => {
        buttonsDisabledStates[key] = true;
      });
    }

    return buttonsDisabledStates;
  },
);

import { createSelector } from 'reselect';
import deepEqual from 'deep-equal';

/**
 * Determines which of the level manager buttons should be disabled
 * @param {Object} levelEditor - The state of the level editor
 * @param {Object} levelManager - The state of the level manager
 * @param {Object} levelSolver - The state of the level solver
 * @param {Object} levelPreview - The state of the level preview
 * @returns {Object} An object of booleans for each of the buttons
 */
export const getLevelManagerButtonDisabledStates = createSelector(
  [
    state => state.levelEditor,
    state => state.levelManager,
    state => state.levelSolver,
    state => state.levelPreview,
  ],
  (levelEditor, levelManager, levelSolver, levelPreview) => {
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
        deepEqual(levelSolver.solution, selectedLevel.solution) &&
        deepEqual(levelEditor.tiles, selectedLevel.tiles) &&
        deepEqual(levelEditor.stars, selectedLevel.stars)
      ) {
        buttonsDisabledStates.btnSave = true;
        buttonsDisabledStates.btnLoad = true;
      }
    }

    //  Disable the "save" and "load" buttons if a level is being previewed
    if (levelPreview.previewing) {
      buttonsDisabledStates.btnSave = true;
      buttonsDisabledStates.btnLoad = true;
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

/**
 * Returns an array of levels sorted by their "position" values
 * @param {Array} levels - The state of the level manager's levels
 * @returns {Array} An array of levels in the correct order
 */
export const getSortedLevels = createSelector([state => state.levelManager.levels], levels =>
  levels.sort((levelA, levelB) => levelA.position - levelB.position),
);

/**
 * Returns the highest "position" value within the levels
 * @param {Array} levels - The state of the level manager's levels
 * @returns {Number} The highest "position" value in the levels array
 */
export const getHighestPositionValue = createSelector(
  [state => state.levelManager.levels],
  levels => (levels.length && Math.max(...levels.map(level => level.position))) || 0,
);

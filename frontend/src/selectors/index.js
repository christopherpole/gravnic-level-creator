import deepEqual from 'deep-equal';
import { createSelector } from 'reselect';
import { GRID_SIZE } from '../config/settings';
import { initialState as levelEditorInitialState } from '../reducers/levelEditor';

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
        deepEqual(levelEditor.tiles, selectedLevel.tiles) &&
        deepEqual(levelEditor.stars, selectedLevel.stars)
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

/**
 * Determines which of the level editor buttons should be disabled
 * @param {Object} levelEditor - The state of the level editor
 * @returns {Object} An object of booleans for each of the buttons
 */
export const getLevelEditorButtonDisabledStates = createSelector(
  state => state.levelEditor,
  levelEditor => {
    //  Disable all buttons by default
    const buttonsDisabledStates = {
      btnReset: false,
      btnPreview: false,
    };

    //  Enable the buttons if there's been a change on the editor
    if (deepEqual(levelEditor.tiles, levelEditorInitialState.tiles)) {
      ['btnReset', 'btnPreview'].forEach(key => {
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

/**
 * Returns raw data about the entities from the given Gravnic game state
 * @param {Array} gameState - The current game state
 * @returns {Array} The raw entity data from the game state
 */
export const getEntitiesData = createSelector(
  [state => state.levelPreview.gameState],
  gameState => {
    const entitiesData = {};

    for (let i = 0; i < gameState.length; i++) {
      for (let j = 0; j < gameState[i].length; j++) {
        if (gameState[i][j].staticEntity) {
          entitiesData[gameState[i][j].staticEntity.id] = {
            entityId: gameState[i][j].staticEntity.entityId,
            xPos: j * GRID_SIZE,
            yPos: i * GRID_SIZE,
          };
        }

        if (gameState[i][j].movableEntity) {
          entitiesData[gameState[i][j].movableEntity.id] = {
            entityId: gameState[i][j].movableEntity.entityId,
            fading: gameState[i][j].movableEntity.fading,
            xPos: j * GRID_SIZE,
            yPos: i * GRID_SIZE,
          };
        }
      }
    }

    return entitiesData;
  },
);

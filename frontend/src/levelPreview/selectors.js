import { createSelector } from 'reselect';

import { GRID_SIZE } from 'config/settings';

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
            isMovableEntity: false,
            xPos: j * GRID_SIZE,
            yPos: i * GRID_SIZE,
          };
        }

        if (gameState[i][j].movableEntity) {
          entitiesData[gameState[i][j].movableEntity.id] = {
            entityId: gameState[i][j].movableEntity.entityId,
            fading: gameState[i][j].movableEntity.fading,
            isMovableEntity: true,
            xPos: j * GRID_SIZE,
            yPos: i * GRID_SIZE,
          };
        }
      }
    }

    return entitiesData;
  },
);

/**
 * Determines which of the level preview buttons should be disabled
 * @param {Object} levelPreview - The state of the level preview
 * @returns {Object} An object of booleans denoting the
 * disabled state for each of the buttons
 */
export const getLevelPreviewButtonDisabledStates = createSelector(
  state => state.levelPreview,
  levelPreview => {
    //  Enable all buttons by default
    const buttonsDisabledStates = {
      btnRestart: false,
      btnUndo: false,
    };

    //  Disable buttons if entities are moving or the game history length is
    //  greater than 1
    if (levelPreview.entitiesMoving || levelPreview.gameHistory.length <= 1) {
      buttonsDisabledStates.btnRestart = true;
      buttonsDisabledStates.btnUndo = true;
    }

    return buttonsDisabledStates;
  },
);

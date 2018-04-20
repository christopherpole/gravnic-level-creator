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

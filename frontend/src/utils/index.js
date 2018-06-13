import shortid from 'shortid';
import { ENTITIES } from 'gravnic-game';

import { GRID_SIZE, MIN_MOVES } from 'config/settings';

/**
 * Creates a new bare-bones level
 * @param {Number} pos - This level's "position" attribute in the level manager
 * @returns {Object} A new level template
 */
export const createNewLevel = pos => ({
  id: shortid.generate(),
  name: 'New level',
  tiles: [...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => ({
    position: index,
    selectedTileId: '1',
  })),
  stars: [MIN_MOVES, MIN_MOVES + 1, MIN_MOVES + 2],
  position: pos,
});

/**
 * Creates a simple action creator
 * @param {String} type - The type of this action
 * @param {String[]} [argNames] - Arguments that the generated action creator will accept
 * @returns {Function} The generated action creator
 */
export function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };

    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });

    return action;
  };
}

/**
 * Converts the editor tile data into a Gravnic game state
 * @param {Object[]} tileData - An array of the basic tile data
 * @param {Object[]} availableTiles - An array of available tiles to match the tile IDs against
 * @returns {Object[]} The computed Gravnic game state
 */
export function convertEditorTilesToGameState(tileData, availableTiles) {
  const gridSize = Math.round(Math.sqrt(tileData.length));
  const gameState = [];
  let currentIdCount = 1;
  let entityRow;
  let entityData;
  let staticEntityId;
  let staticEntity;
  let movableEntity;
  let i;
  let j;
  const blankTileId = availableTiles.find(tile => tile.entity.entityId === ENTITIES.NONE).id;

  //  Get first row index with an entity
  let firstRowIndexWithEntity = -1;
  for (i = 0; i < tileData.length; i++) {
    if (tileData[i].selectedTileId !== blankTileId) {
      firstRowIndexWithEntity = Math.floor(i / 10);
      break;
    }
  }

  //  Get last row index with an entity
  let lastRowIndexWithEntity = -1;
  for (i = tileData.length - 1; i >= 0; i--) {
    if (tileData[i].selectedTileId !== blankTileId) {
      lastRowIndexWithEntity = Math.floor(i / 10);
      break;
    }
  }

  //  Get first column index with an entity
  let firstColumnIndexWithEntity = -1;
  for (i = 0; i < tileData.length; i++) {
    if (tileData[(i % 10) * 10 + Math.floor(i / 10)].selectedTileId !== blankTileId) {
      firstColumnIndexWithEntity = ((i % 10) * 10 + Math.floor(i / 10)) % 10;
      break;
    }
  }

  //  Get last column index with an entity
  let lastColumnIndexWithEntity = -1;
  for (i = tileData.length - 1; i >= 0; i--) {
    if (tileData[(i % 10) * 10 + Math.floor(i / 10)].selectedTileId !== blankTileId) {
      lastColumnIndexWithEntity = ((i % 10) * 10 + Math.floor(i / 10)) % 10;
      break;
    }
  }

  const getEntityDataForTileId = tileId => availableTiles.find(tile => tile.id === tileId).entity;

  //  If there's no entities then jsut return en empty array
  if (firstRowIndexWithEntity === -1) return [];

  //  For each of the non-blank rows...
  for (i = firstRowIndexWithEntity; i <= lastRowIndexWithEntity; i++) {
    entityRow = [];

    //  For each of the non-blank columns...
    for (j = firstColumnIndexWithEntity; j <= lastColumnIndexWithEntity; j++) {
      entityData = getEntityDataForTileId(tileData[i * gridSize + j].selectedTileId);

      staticEntity = null;
      movableEntity = null;
      staticEntityId = null;

      //  If the entity is a block then add it as the movable entity
      if (
        entityData.entityId === ENTITIES.BLOCK ||
        entityData.entityId === ENTITIES.RAINBOW_BLOCK ||
        entityData.entityId === ENTITIES.GLASS
      ) {
        movableEntity = {
          ...entityData,
          id: currentIdCount++,
        };
      } else if (
        entityData.entityId === ENTITIES.FLOOR ||
        entityData.entityId === ENTITIES.BLACK_HOLE
      ) {
        staticEntityId = entityData.entityId;
      }

      //  If this is a movable entity on this tile then we'll need to add a floor too
      if (movableEntity) {
        staticEntityId = ENTITIES.FLOOR;
      }

      if (staticEntityId) {
        staticEntity = {
          id: currentIdCount++,
          entityId: staticEntityId,
        };
      }

      entityRow.push({
        staticEntity,
        movableEntity,
      });
    }

    gameState.push(entityRow);
  }

  return gameState;
}

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
export function convertEditorTilesToGameState(tileData, availableTiles, links = []) {
  const gridSize = Math.round(Math.sqrt(tileData.length));
  const gameState = [];
  let currentIdCount = 0;
  let entityRow;
  let entityData;
  let staticEntity;
  let movableEntity;
  let isStaticEntity;
  let i;
  let j;
  const blankTileId = availableTiles.find(tile => tile.entity.entityId === ENTITIES.NONE.id).id;
  const linkableEntityPositionsToIds = {};

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
      isStaticEntity = ENTITIES[entityData.entityId].static;

      //  Skip blank tiles
      if (entityData.entityId !== ENTITIES.NONE.id) {
        //  Add our static entity if we have one
        if (isStaticEntity) {
          staticEntity = {
            ...entityData,
            id: ++currentIdCount,
          };

          //  Keep a track of this entity's position in the original level editor data
          //  if it's a linkable entity
          if (entityData.linkable) {
            linkableEntityPositionsToIds[tileData[i * gridSize + j].position] = currentIdCount;
            delete staticEntity.linkable;
          }
        } else {
          //  Add our movable entity if we have one
          movableEntity = {
            ...entityData,
            id: ++currentIdCount,
          };

          //  If this is a movable entity on this tile then we'll need to add a floor too
          staticEntity = {
            entityId: ENTITIES.FLOOR.id,
            id: ++currentIdCount,
          };
        }
      }

      entityRow.push({
        staticEntity,
        movableEntity,
      });
    }

    gameState.push(entityRow);
  }

  const getStaticEntityById = id => {
    for (i = 0; i < gameState.length; i++) {
      for (j = 0; j < gameState[0].length; j++) {
        if (gameState[i][j].staticEntity && gameState[i][j].staticEntity.id === id) {
          return gameState[i][j].staticEntity;
        }
      }
    }

    return null;
  };

  //  Add the data for the links in
  links.forEach(link => {
    getStaticEntityById(linkableEntityPositionsToIds[link.from]).linkedEntityId =
      linkableEntityPositionsToIds[link.to];
    getStaticEntityById(linkableEntityPositionsToIds[link.to]).linkedEntityId =
      linkableEntityPositionsToIds[link.from];
  });

  return gameState;
}

import { createSelector } from 'reselect';
import deepEqual from 'deep-equal';
import { convertEditorTilesToGameState } from 'utils';

import { initialState as levelEditorInitialState } from './reducer';

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
      btnSolve: false,
      btnExport: false,
    };

    //  Enable the buttons if there's been a change on the editor
    if (deepEqual(levelEditor.tiles, levelEditorInitialState.tiles)) {
      ['btnReset', 'btnPreview', 'btnSolve', 'btnExport'].forEach(key => {
        buttonsDisabledStates[key] = true;
      });
    }

    return buttonsDisabledStates;
  },
);

/**
 * Computes the appropriate game state for the current level editor tiles
 * @param {Object} levelEditor - The state of the level editor
 * @returns {String} Stringified JSON representation of the current editor tiles
 */
export const convertTileDataToGravnicGameStateString = createSelector(
  state => state.levelEditor,
  levelEditor =>
    JSON.stringify(
      convertEditorTilesToGameState(
        levelEditor.tiles,
        levelEditor.availableTiles,
        levelEditor.links,
      ),
    ),
);

/**
 * Finds the entity from the available tiles that match the given tile id
 * @param {Object} levelEditor - The state of the level editor
 * @param {String} tileId - The ID of the tile to find
 * @returns {Object} The entity data for the given tile ID
 */
export const getEntityForTileId = createSelector(
  state => state.levelEditor,
  (state, tileId) => tileId,
  (levelEditor, tileId) => levelEditor.availableTiles.find(tile => tile.id === tileId).entity,
);

/**
 * Formats the positions of links to percentages for the links display
 * @param {Object} levelEditor - The state of the level editor
 * @returns {Array} An array of percentages to be used for the links
 */
export const getLinkCoords = createSelector(
  state => state.levelEditor,
  levelEditor => {
    const arr = levelEditor.links.map(link => ({
      x1: `${(link.from % 10) * 10 + 5}%`,
      y1: `${Math.floor(link.from / 10) * 10 + 5}%`,
      x2: `${(link.to % 10) * 10 + 5}%`,
      y2: `${Math.floor(link.to / 10) * 10 + 5}%`,
    }));

    if (levelEditor.linkFromTilePos && levelEditor.linkToTilePos) {
      arr.push({
        x1: `${(levelEditor.linkFromTilePos % 10) * 10 + 5}%`,
        y1: `${Math.floor(levelEditor.linkFromTilePos / 10) * 10 + 5}%`,
        x2: `${(levelEditor.linkToTilePos % 10) * 10 + 5}%`,
        y2: `${Math.floor(levelEditor.linkToTilePos / 10) * 10 + 5}%`,
      });
    }

    return arr;
  },
);

/**
 * Gets the level editor's tiles and extends them with whether or not they should be darkened or not
 * @param {Object} levelEditor - The state of the level editor
 * @returns {Array} An array of the editor's tiles with the darkened state
 */
export const getTilesWithDarkenedStates = createSelector(
  state => state.levelEditor,
  levelEditor => {
    const { availableTiles } = levelEditor;
    let newTiles = levelEditor.tiles;

    const linking = !!(
      levelEditor.linkFromTilePos !== null &&
      levelEditor.linkToTilePos !== null &&
      levelEditor.linkFromTilePos !== levelEditor.linkToTilePos
    );

    newTiles = newTiles.map(newTile => ({
      ...newTile,
      darkened:
        linking &&
        !availableTiles.find(
          availableTile =>
            availableTile.id === newTile.selectedTileId && availableTile.entity.linkable,
        ),
    }));

    return newTiles;
  },
);

/**
 * Returns true if in linking mode
 * @param {Object} levelEditor - The state of the level editor
 * @returns {Boolean} True if linking and false otherwise
 */
export const isLinkingMode = createSelector(
  state => state.levelEditor,
  levelEditor => {
    const { linkFromTilePos, linkToTilePos } = levelEditor;

    return linkFromTilePos !== null && linkToTilePos !== null && linkFromTilePos !== linkToTilePos;
  },
);

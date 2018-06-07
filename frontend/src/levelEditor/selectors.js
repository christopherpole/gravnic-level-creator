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
      btnExport: false,
    };

    //  Enable the buttons if there's been a change on the editor
    if (deepEqual(levelEditor.tiles, levelEditorInitialState.tiles)) {
      ['btnReset', 'btnPreview', 'btnExport'].forEach(key => {
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
    JSON.stringify(convertEditorTilesToGameState(levelEditor.tiles, levelEditor.availableTiles)),
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

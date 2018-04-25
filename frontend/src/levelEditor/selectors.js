import { createSelector } from 'reselect';
import deepEqual from 'deep-equal';

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

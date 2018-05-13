import { convertEditorTilesToGameState } from 'utils';
import testLevels from 'data/testLevels';
import { initialState as levelEditorInitialState } from './reducer';
import {
  getLevelEditorButtonDisabledStates,
  convertTileDataToGravnicGameStateString,
} from './selectors';

describe('getLevelEditorButtonDisabledStates()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelEditor: {
        tiles: levelEditorInitialState.tiles,
      },
    };
  });

  it('Disables the clear and reset buttons if there are no changes to the grid', () => {
    const buttonDisabledStates = getLevelEditorButtonDisabledStates(state);

    expect(buttonDisabledStates.btnReset).toBe(true);
    expect(buttonDisabledStates.btnPreview).toBe(true);
    expect(buttonDisabledStates.btnExport).toBe(true);
  });

  it('Enables the clear and reset buttons if there are changes on the grid', () => {
    const buttonDisabledStates = getLevelEditorButtonDisabledStates({
      ...state,
      levelEditor: {
        tiles: [
          {
            ...levelEditorInitialState.tiles[0],
            selectedTileId: levelEditorInitialState.tiles[0].selectedTileId + 1,
          },
          ...levelEditorInitialState.tiles.slice(1),
        ],
      },
    });

    expect(buttonDisabledStates.btnReset).toBe(false);
    expect(buttonDisabledStates.btnPreview).toBe(false);
    expect(buttonDisabledStates.btnExport).toBe(false);
  });
});

describe('convertTileDataToGravnicGameStateString()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelEditor: {
        tiles: testLevels[0],
      },
    };
  });

  it('Calculates the game state from the editor tiles state', () => {
    const gameStateString = convertTileDataToGravnicGameStateString(state);

    expect(gameStateString).toBe(
      JSON.stringify(convertEditorTilesToGameState(state.levelEditor.tiles)),
    );
  });
});

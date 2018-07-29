import { convertEditorTilesToGameState } from 'utils';
import testLevels from 'data/testLevels';
import { initialState as levelEditorInitialState } from './reducer';
import {
  getLevelEditorButtonDisabledStates,
  convertTileDataToGravnicGameStateString,
  getEntityForTileId,
  getLinkCoords,
} from './selectors';

describe('getLevelEditorButtonDisabledStates()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelEditor: {
        tiles: levelEditorInitialState.tiles,
        availableTiles: levelEditorInitialState.availableTiles,
      },
    };
  });

  it('Disables buttons if there are no changes to the grid', () => {
    const buttonDisabledStates = getLevelEditorButtonDisabledStates(state);

    expect(buttonDisabledStates.btnReset).toBe(true);
    expect(buttonDisabledStates.btnPreview).toBe(true);
    expect(buttonDisabledStates.btnSolve).toBe(true);
    expect(buttonDisabledStates.btnExport).toBe(true);
  });

  it('Enables buttons if there are changes on the grid', () => {
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
        availableTiles: levelEditorInitialState.availableTiles,
      },
    });

    expect(buttonDisabledStates.btnReset).toBe(false);
    expect(buttonDisabledStates.btnPreview).toBe(false);
    expect(buttonDisabledStates.btnSolve).toBe(false);
    expect(buttonDisabledStates.btnExport).toBe(false);
  });
});

describe('convertTileDataToGravnicGameStateString()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelEditor: {
        tiles: testLevels[0],
        availableTiles: levelEditorInitialState.availableTiles,
      },
    };
  });

  it('Calculates the game state from the editor tiles state', () => {
    const gameStateString = convertTileDataToGravnicGameStateString(state);

    expect(gameStateString).toBe(
      JSON.stringify(
        convertEditorTilesToGameState(state.levelEditor.tiles, state.levelEditor.availableTiles),
      ),
    );
  });
});

describe('getEntityForTileId()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelEditor: {
        availableTiles: [
          {
            id: '1',
            entity: {
              entityId: 'NONE',
            },
          },
          {
            id: '2',
            entity: {
              entityId: 'FLOOR',
            },
          },
          {
            id: '3',
            entity: {
              entityId: 'BLOCK',
            },
          },
        ],
      },
    };
  });

  it('Retrieves the correct entity data for the given tile ID', () => {
    const entity = getEntityForTileId(state, state.levelEditor.availableTiles[1].id);

    expect(entity).toBe(state.levelEditor.availableTiles[1].entity);
  });
});

describe('getLinkPositions()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelEditor: {
        links: [{ from: 1, to: 2 }, { from: 3, to: 4 }, { from: 3, to: 5 }],
        linkFromTilePos: 2,
        linkToTilePos: 5,
      },
    };
  });

  it('Formats the links correctly when there are no links and no tiles are being linked', () => {
    const linkPositions = getLinkCoords({
      ...state,
      levelEditor: { ...state.levelEditor, links: [], linkFromTilePos: null, linkToTilePos: null },
    });

    expect(linkPositions).toEqual([]);
  });

  it('Formats the links correctly', () => {
    const expectedLinkPositions = [
      { x1: '15%', x2: '25%', y1: '5%', y2: '5%' },
      { x1: '35%', x2: '45%', y1: '5%', y2: '5%' },
      { x1: '35%', x2: '55%', y1: '5%', y2: '5%' },
      { x1: '25%', x2: '55%', y1: '5%', y2: '5%' },
    ];
    const linkPositions = getLinkCoords(state);

    expect(linkPositions).toEqual(expectedLinkPositions);
  });
});

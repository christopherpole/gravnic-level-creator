import { convertEditorTilesToGameState } from 'utils';
import testLevels from 'data/testLevels';
import { initialState as levelEditorInitialState } from './reducer';
import {
  getLevelEditorButtonDisabledStates,
  convertTileDataToGravnicGameStateString,
  getEntityForTileId,
  getLinkCoords,
  getTilesWithDarkenedStates,
  isLinkingMode,
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
        links: [],
      },
    };
  });

  it('Calculates the game state from the editor tiles state', () => {
    const gameStateString = convertTileDataToGravnicGameStateString(state);

    expect(gameStateString).toBe(
      JSON.stringify(
        convertEditorTilesToGameState(
          state.levelEditor.tiles,
          state.levelEditor.availableTiles,
          state.levelEditor.links,
        ),
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

describe('getTilesWithDarkenedStates()', () => {
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
              entityId: 'TELEPORTER',
              linkable: true,
            },
          },
          {
            id: '3',
            entity: {
              entityId: 'BLOCK',
            },
          },
        ],
        tiles: [
          { selectedTileId: '2', position: 0 },
          { selectedTileId: '1', position: 1 },
          { selectedTileId: '3', position: 2 },
          { selectedTileId: '2', position: 3 },
          { selectedTileId: '2', position: 4 },
        ],
        linkFromTilePos: null,
        linkToTilePos: null,
      },
    };
  });

  it('Returns the tiles with the correct darkened states if not linking from any tile', () => {
    const tilesWithDarkenedStates = getTilesWithDarkenedStates(state);

    expect(tilesWithDarkenedStates).toEqual(
      state.levelEditor.tiles.map(tile => ({ ...tile, darkened: false })),
    );
  });

  it('Returns the tiles with the correct darkened states if linking to the same tile', () => {
    const tilesWithDarkenedStates = getTilesWithDarkenedStates({
      ...state,
      levelEditor: { ...state.levelEditor, linkFromTilePos: 0, linkToTilePos: 0 },
    });

    expect(tilesWithDarkenedStates).toEqual(
      state.levelEditor.tiles.map(tile => ({ ...tile, darkened: false })),
    );
  });

  it('Returns the tiles with the correct darkened states if linking', () => {
    const tilesWithDarkenedStates = getTilesWithDarkenedStates({
      ...state,
      levelEditor: { ...state.levelEditor, linkFromTilePos: 0, linkToTilePos: 3 },
    });

    expect(tilesWithDarkenedStates).toEqual(
      state.levelEditor.tiles.map(tile => ({ ...tile, darkened: tile.selectedTileId !== '2' })),
    );
  });
});

describe('isLinkingMode()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelEditor: {
        linkFromTilePos: null,
        linkToTilePos: null,
      },
    };
  });

  it('Returns false if not dragging from a tile', () => {
    const linkingMode = isLinkingMode(state);

    expect(linkingMode).toBe(false);
  });

  it('Returns false if dragging to own tile', () => {
    const linkingMode = isLinkingMode({
      ...state,
      levelEditor: { ...state.levelEditor, linkFromTilePos: 3, linkToTilePos: 3 },
    });

    expect(linkingMode).toBe(false);
  });
});

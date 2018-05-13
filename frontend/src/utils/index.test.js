import { ENTITIES } from 'gravnic-game';

import { GRID_SIZE, MIN_MOVES } from 'config/settings';
import { createNewLevel, makeActionCreator, convertEditorTilesToGameState } from './index';
import testLevels from 'data/testLevels';

describe('createNewLevel()', () => {
  it('Returns a new level template', () => {
    const newLevel = createNewLevel(5);

    expect(typeof newLevel.id).toBe('string');
    expect(typeof newLevel.name).toBe('string');
    expect(newLevel.tiles instanceof Array).toBe(true);
    expect(newLevel.tiles.length).toBe(GRID_SIZE * GRID_SIZE);
    expect(typeof newLevel.tiles[0]).toBe('object');
    expect(typeof newLevel.tiles[0].position).toBe('number');
    expect(typeof newLevel.tiles[0].selectedTileId).toBe('string');
    expect(newLevel.stars).toEqual([MIN_MOVES, MIN_MOVES + 1, MIN_MOVES + 2]);
    expect(newLevel.position).toBe(5);
  });
});

describe('makeActionCreator()', () => {
  it('Creates new action creators', () => {
    const action = makeActionCreator('CREATE_LEVEL', 'level');

    expect(typeof action).toBe('function');
    expect(action({ name: 'New level' })).toEqual({
      type: 'CREATE_LEVEL',
      level: { name: 'New level' },
    });
  });
});

describe('convertEditorTilesToGameState()', () => {
  let testTiles;

  beforeEach(() => {
    testTiles = [...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => ({
      position: i,
      selectedTileId: ENTITIES.NONE,
    }));
  });

  it('Returns an empty array if there is no tile data', () => {
    const gameState = convertEditorTilesToGameState([]);

    expect(gameState).toEqual([]);
  });

  it('Returns an empty array if all tiles are blank', () => {
    const gameState = convertEditorTilesToGameState(testTiles);

    expect(gameState).toEqual([]);
  });

  it('Returns the current game state for a single block', () => {
    const gameState = convertEditorTilesToGameState([
      ...testTiles.slice(0, 45),
      {
        position: 46,
        selectedTileId: ENTITIES.BLOCK,
      },
      ...testTiles.slice(46),
    ]);

    expect(gameState).toEqual([
      [
        {
          movableEntity: { entityId: 'ENTITY_BLOCK', id: 1 },
          staticEntity: { entityId: 'ENTITY_FLOOR', id: 2 },
        },
      ],
    ]);
  });

  it('Returns the current game state for a multiple blocks', () => {
    const gameState = convertEditorTilesToGameState([
      ...testTiles.slice(0, 12),
      {
        position: 12,
        selectedTileId: ENTITIES.BLOCK,
      },
      ...testTiles.slice(13, 37),
      {
        position: 37,
        selectedTileId: ENTITIES.FLOOR,
      },
      ...testTiles.slice(38),
    ]);

    const expectedGameState = [
      [
        {
          movableEntity: { entityId: 'ENTITY_BLOCK', id: 1 },
          staticEntity: { entityId: 'ENTITY_FLOOR', id: 2 },
        },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
      ],
      [
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
      ],
      [
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        {
          movableEntity: null,
          staticEntity: { entityId: 'ENTITY_FLOOR', id: 3 },
        },
      ],
    ];

    expect(gameState).toEqual(expectedGameState);
  });
});

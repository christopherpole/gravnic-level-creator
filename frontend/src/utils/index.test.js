import { ENTITIES } from 'gravnic-game';

import { GRID_SIZE, MIN_MOVES } from 'config/settings';
import availableTiles from 'config/tiles';
import { createNewLevel, makeActionCreator, convertEditorTilesToGameState } from './index';

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
  let tiles;

  beforeEach(() => {
    testTiles = createNewLevel().tiles;
    tiles = availableTiles;
  });

  it('Returns an empty array if there is no tile data', () => {
    const gameState = convertEditorTilesToGameState([], tiles);

    expect(gameState).toEqual([]);
  });

  it('Returns an empty array if all tiles are blank', () => {
    const gameState = convertEditorTilesToGameState(testTiles, tiles);

    expect(gameState).toEqual([]);
  });

  it('Returns the current game state for a single block', () => {
    const gameState = convertEditorTilesToGameState(
      [
        ...testTiles.slice(0, 45),
        {
          position: 46,
          selectedTileId: '4',
        },
        ...testTiles.slice(46),
      ],
      tiles,
    );

    expect(gameState).toEqual([
      [
        {
          movableEntity: { entityId: ENTITIES.BLOCK.id, color: '#ff0000', id: 1 },
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
        },
      ],
    ]);
  });

  it('Returns the current game state for multiple blocks', () => {
    const gameState = convertEditorTilesToGameState(
      [
        ...testTiles.slice(0, 12),
        {
          position: 12,
          selectedTileId: '3',
        },
        ...testTiles.slice(13, 37),
        {
          position: 37,
          selectedTileId: '2',
        },
        ...testTiles.slice(38),
      ],
      tiles,
    );

    const expectedGameState = [
      [
        {
          movableEntity: { entityId: ENTITIES.GLASS.id, id: 1 },
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 2 },
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
          staticEntity: { entityId: ENTITIES.FLOOR.id, id: 3 },
        },
      ],
    ];

    expect(gameState).toEqual(expectedGameState);
  });

  it('Returns the current game state for multiple blocks and links', () => {
    const links = [{ from: 12, to: 21 }, { from: 41, to: 37 }];
    const teleporterTileId = tiles.find(tile => tile.entity.entityId === ENTITIES.TELEPORTER.id).id;

    const gameState = convertEditorTilesToGameState(
      [
        ...testTiles.slice(0, 12),
        {
          position: 12,
          selectedTileId: teleporterTileId,
        },
        ...testTiles.slice(13, 21),
        {
          position: 21,
          selectedTileId: teleporterTileId,
        },
        ...testTiles.slice(22, 37),
        {
          position: 37,
          selectedTileId: teleporterTileId,
        },
        ...testTiles.slice(38, 41),
        {
          position: 41,
          selectedTileId: teleporterTileId,
        },
        ...testTiles.slice(42, 44),
        {
          position: 44,
          selectedTileId: teleporterTileId,
        },
        ...testTiles.slice(45),
      ],
      tiles,
      links,
    );

    const expectedGameState = [
      [
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: { entityId: 'TELEPORTER', id: 1, linkedEntityId: 2 } },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
      ],
      [
        { movableEntity: null, staticEntity: { entityId: 'TELEPORTER', id: 2, linkedEntityId: 1 } },
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
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: { entityId: 'TELEPORTER', id: 3, linkedEntityId: 4 } },
      ],
      [
        { movableEntity: null, staticEntity: { entityId: 'TELEPORTER', id: 4, linkedEntityId: 3 } },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: { entityId: 'TELEPORTER', id: 5 } },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
        { movableEntity: null, staticEntity: null },
      ],
    ];

    expect(gameState).toEqual(expectedGameState);
  });
});

import { ENTITIES } from 'gravnic-game';

import { SAVE_LEVEL, LOAD_LEVEL_CONFIRMED } from 'levelManager/actions';
import testLevels from 'data/testLevels';
import { MIN_MOVES, MAX_MOVES } from 'config/settings';
import {
  SELECT_TILE,
  UPDATE_TILE,
  RESET_GRID,
  START_DRAG,
  STOP_DRAG,
  SET_STARS,
  SET_LINK_TO_TILE_POS,
  CREATE_LINK,
} from './actions';
import reducer, { initialState } from './reducer';

describe('The level editor reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  describe('SELECT_TILE', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(undefined, {
          type: SELECT_TILE,
          selectedTileId: ENTITIES.BLOCK.id,
        }),
      ).toEqual({
        ...initialState,
        selectedTileId: ENTITIES.BLOCK.id,
      });
    });
  });

  describe('UPDATE_TILE', () => {
    it('Updates the tile correctly', () => {
      const newTiles = initialState.tiles.slice();
      newTiles[44] = {
        ...initialState.tiles[44],
        selectedTileId: ENTITIES.BLOCK.id,
      };

      expect(
        reducer(
          {
            ...initialState,
            selectedTileId: ENTITIES.BLOCK.id,
          },
          {
            type: UPDATE_TILE,
            position: 44,
          },
        ),
      ).toEqual({
        ...initialState,
        selectedTileId: ENTITIES.BLOCK.id,
        tiles: newTiles,
        editedSinceLastSave: true,
      });
    });

    it('Updates the tile correctly and removes any links that the tile had', () => {
      const newTiles = initialState.tiles.slice();
      newTiles[44] = {
        ...initialState.tiles[44],
        selectedTileId: ENTITIES.BLOCK.id,
      };

      expect(
        reducer(
          {
            ...initialState,
            selectedTileId: ENTITIES.BLOCK.id,
            links: [
              { from: 1, to: 2 },
              { from: 44, to: 33 },
              { from: 3, to: 44 },
              { from: 3, to: 21 },
            ],
          },
          {
            type: UPDATE_TILE,
            position: 44,
          },
        ),
      ).toEqual({
        ...initialState,
        selectedTileId: ENTITIES.BLOCK.id,
        tiles: newTiles,
        editedSinceLastSave: true,
        links: [{ from: 1, to: 2 }, { from: 3, to: 21 }],
      });
    });
  });

  describe('RESET_GRID', () => {
    it('Handles the action correctly', () => {
      const newTiles = initialState.tiles.slice();
      newTiles[44] = {
        ...initialState.tiles[44],
        selectedTileId: ENTITIES.BLOCK.id,
      };

      expect(
        reducer(
          {
            ...initialState,
            tiles: newTiles,
            selectedTileId: ENTITIES.BLOCK.id,
            editedSinceLastSave: true,
            links: [{ to: 3, from: 2 }],
          },
          {
            type: RESET_GRID,
          },
        ),
      ).toEqual({
        ...initialState,
        selectedTileId: ENTITIES.BLOCK.id,
        tiles: initialState.tiles,
        editedSinceLastSave: false,
      });
    });
  });

  describe('SAVE_LEVEL', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...initialState,
            editedSinceLastSave: true,
          },
          {
            type: SAVE_LEVEL,
          },
        ),
      ).toEqual({
        ...initialState,
        editedSinceLastSave: false,
      });
    });
  });

  describe('LOAD_LEVEL_CONFIRMED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...initialState,
            editedSinceLastSave: true,
          },
          {
            type: LOAD_LEVEL_CONFIRMED,
            level: testLevels[1],
          },
        ),
      ).toEqual({
        ...initialState,
        tiles: testLevels[1].tiles,
        stars: testLevels[1].stars,
        editedSinceLastSave: false,
        links: testLevels[1].links,
      });
    });
  });

  describe('START_DRAG', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(initialState, {
          type: START_DRAG,
          linkFromTilePos: 4,
        }),
      ).toEqual({
        ...initialState,
        dragging: true,
        linkFromTilePos: 4,
      });
    });
  });

  describe('STOP_DRAG', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...initialState,
            dragging: true,
            linkFromTilePos: 2,
            linkToTilePos: 4,
          },
          {
            type: STOP_DRAG,
          },
        ),
      ).toEqual(initialState);
    });
  });

  describe('SET_STARS', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...initialState,
            stars: [1, 3, 5],
          },
          {
            type: SET_STARS,
            starsIndex: 1,
            stars: 2,
          },
        ),
      ).toEqual({
        ...initialState,
        stars: [1, 2, 5],
        editedSinceLastSave: true,
      });
    });

    it("Don't allow a lower rank to have a greater star criteria than a high rank", () => {
      expect(
        reducer(
          {
            ...initialState,
            stars: [1, 2, 3],
          },
          {
            type: SET_STARS,
            starsIndex: 0,
            stars: 5,
          },
        ),
      ).toEqual({
        ...initialState,
        stars: [5, 5, 5],
        editedSinceLastSave: true,
      });
    });

    it("Don't allow a higher rank to have a lower star criteria than a lower rank", () => {
      expect(
        reducer(
          {
            ...initialState,
            stars: [3, 4, 5],
          },
          {
            type: SET_STARS,
            starsIndex: 2,
            stars: 1,
          },
        ),
      ).toEqual({
        ...initialState,
        stars: [1, 1, 1],
        editedSinceLastSave: true,
      });
    });

    it('Ensures that all ranks require the minimum number of stars', () => {
      expect(
        reducer(
          {
            ...initialState,
            stars: [1, 2, 3],
          },
          {
            type: SET_STARS,
            starsIndex: 1,
            stars: MIN_MOVES - 1,
          },
        ),
      ).toEqual({
        ...initialState,
        stars: [MIN_MOVES, MIN_MOVES, 3],
        editedSinceLastSave: true,
      });
    });

    it('Ensures that no ranks have over the maximum number of stars', () => {
      expect(
        reducer(
          {
            ...initialState,
            stars: [1, 2, 3],
          },
          {
            type: SET_STARS,
            starsIndex: 1,
            stars: MAX_MOVES + 1,
          },
        ),
      ).toEqual({
        ...initialState,
        stars: [1, MAX_MOVES, MAX_MOVES],
        editedSinceLastSave: true,
      });
    });
  });

  describe('SET_LINK_TO_TILE_POS', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(initialState, {
          type: SET_LINK_TO_TILE_POS,
          position: 4,
        }),
      ).toEqual({
        ...initialState,
        linkToTilePos: 4,
      });
    });
  });

  describe('CREATE_LINK', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...initialState,
            linkFromTilePos: 2,
            linkToTilePos: 3,
          },
          {
            type: CREATE_LINK,
          },
        ),
      ).toEqual({
        ...initialState,
        linkFromTilePos: 2,
        linkToTilePos: 3,
        links: [{ from: 2, to: 3 }],
      });
    });
  });
});

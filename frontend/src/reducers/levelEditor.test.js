import reducer, { initialState } from './levelEditor';
import {
  SELECT_TILE,
  UPDATE_TILE,
  RESET_GRID,
  START_DRAG,
  STOP_DRAG,
  SET_STARS,
} from '../actions/levelEditor';
import { SAVE_LEVEL, LOAD_LEVEL_CONFIRMED } from '../actions/levelManager';
import testLevels from '../data/testLevels';
import { MIN_MOVES, MAX_MOVES } from '../config/settings';

describe('The level editor reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('Should handle the SELECT_TILE action', () => {
    expect(
      reducer(undefined, {
        type: SELECT_TILE,
        selectedTileId: '3',
      }),
    ).toEqual({
      ...initialState,
      selectedTileId: '3',
    });
  });

  it('Should handle the UPDATE_TILE action', () => {
    const newTiles = initialState.tiles.slice();
    newTiles[44] = {
      ...initialState.tiles[44],
      selectedTileId: '3',
    };

    expect(
      reducer(
        {
          ...initialState,
          selectedTileId: '3',
        },
        {
          type: UPDATE_TILE,
          position: 44,
        },
      ),
    ).toEqual({
      ...initialState,
      selectedTileId: '3',
      tiles: newTiles,
      editedSinceLastSave: true,
    });
  });

  it('Should handle the RESET_GRID action', () => {
    const newTiles = initialState.tiles.slice();
    newTiles[44] = {
      ...initialState.tiles[44],
      selectedTileId: '3',
    };

    expect(
      reducer(
        {
          ...initialState,
          tiles: newTiles,
          selectedTileId: '3',
          editedSinceLastSave: true,
        },
        {
          type: RESET_GRID,
        },
      ),
    ).toEqual({
      ...initialState,
      selectedTileId: '3',
      tiles: initialState.tiles,
      editedSinceLastSave: false,
    });
  });

  it('Should handle the SAVE_LEVEL action', () => {
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

  it('Should handle the LOAD_LEVEL_CONFIRMED action', () => {
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
    });
  });

  it('Should handle the START_DRAG action', () => {
    expect(
      reducer(initialState, {
        type: START_DRAG,
      }),
    ).toEqual({
      ...initialState,
      dragging: true,
    });
  });

  it('Should handle the STOP_DRAG action', () => {
    expect(
      reducer(
        {
          ...initialState,
          dragging: true,
        },
        {
          type: STOP_DRAG,
        },
      ),
    ).toEqual({
      ...initialState,
      dragging: false,
    });
  });

  it('Should handle the SET_STARS action', () => {
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

    //  Don't allow trailing index values to be higher
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

    //  Don't previous index values to be lower
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

    //  Ensure values are at least 1
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

    //  Ensure values are at most 99
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

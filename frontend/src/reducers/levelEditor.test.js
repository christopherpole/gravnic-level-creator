import reducer, { initialState } from './levelEditor';
import {
  SELECT_TILE,
  UPDATE_TILE,
  RESET_GRID,
  EDIT_LEVEL,
  PREVIEW_LEVEL,
  START_DRAG,
  STOP_DRAG,
} from '../actions/levelEditor';
import { LOAD_LEVEL } from '../actions/levelManager';
import testLevels from '../data/testLevels';

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
    });
  });

  it('Should handle the PREVIEW_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          previewing: false,
        },
        {
          type: PREVIEW_LEVEL,
        },
      ),
    ).toEqual({
      ...initialState,
      previewing: true,
    });
  });

  it('Should handle the EDIT_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          previewing: true,
        },
        {
          type: EDIT_LEVEL,
        },
      ),
    ).toEqual({
      ...initialState,
      previewing: false,
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
        },
        {
          type: RESET_GRID,
        },
      ),
    ).toEqual({
      ...initialState,
      selectedTileId: '3',
      tiles: initialState.tiles,
    });
  });

  it('Should handle the LOAD_LEVEL action', () => {
    expect(
      reducer(initialState, {
        type: LOAD_LEVEL,
        level: testLevels[1],
      }),
    ).toEqual({
      ...initialState,
      tiles: testLevels[1].tiles,
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
});

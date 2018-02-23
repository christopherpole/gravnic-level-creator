import reducer, { initialState } from './levelEditor';
import { SELECT_TILE, UPDATE_TILE } from '../actions/levelEditor';

describe('The level editor reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('Should handle the SELECT_TILE action', () => {
    expect(reducer(undefined, {
      type: SELECT_TILE,
      selectedTileId: 3,
    })).toEqual({
      ...initialState,
      selectedTileId: 3,
    });
  });

  it('Should handle the UPDATE_TILE action', () => {
    const newTiles = initialState.tiles.slice();
    newTiles[44] = {
      ...initialState.tiles[44],
      selectedTileId: 3,
    };

    expect(reducer({
      ...initialState,
      selectedTileId: 3,
    }, {
      type: UPDATE_TILE,
      position: 44,
    })).toEqual({
      ...initialState,
      selectedTileId: 3,
      tiles: newTiles,
    });
  });
});

import reducer, { initialState as levelEditorInitialState } from './levelEditor';
import { SELECT_TILE, UPDATE_TILE } from '../actions/levelEditor';

describe('The level editor reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(levelEditorInitialState);
  });

  it('Should handle the SELECT_TILE action', () => {
    expect(reducer(undefined, {
      type: SELECT_TILE,
      selectedTileId: 3,
    })).toEqual({
      ...levelEditorInitialState,
      selectedTileId: 3,
    });
  });

  it('Should handle the UPDATE_TILE action', () => {
    expect(reducer(undefined, {
      type: UPDATE_TILE,
      pos: 1,
      tileId: 2,
    })).toEqual(levelEditorInitialState);
  });
});

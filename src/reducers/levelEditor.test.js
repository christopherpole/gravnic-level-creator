import reducer, { initialState as levelEditorInitialState } from './levelEditor';
import { UPDATE_TILE } from '../actions/levelEditor';

describe('editor tiles reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(levelEditorInitialState);
  });

  it('should handle the UPDATE_TILE action', () => {
    expect(reducer(undefined, {
      type: UPDATE_TILE,
      pos: 1,
      tileId: 2,
    })).toEqual(levelEditorInitialState);
  });
});

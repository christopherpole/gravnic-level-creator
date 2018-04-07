import reducer, { initialState } from './levelPreview';
import { PREVIEW_LEVEL } from '../actions/levelEditor';

describe('The level editor reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('Should handle the PREVIEW_LEVEL action', () => {
    expect(
      reducer(undefined, {
        type: PREVIEW_LEVEL,
        gameState: [[1, 2], [3, 2]],
      }),
    ).toEqual({
      ...initialState,
      gameState: [[1, 2], [3, 2]],
    });
  });
});

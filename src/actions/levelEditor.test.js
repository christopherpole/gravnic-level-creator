import { UPDATE_TILE, updateTile } from './levelEditor';

describe('editor tiles actions', () => {
  it('should create an action to update a tile', () => {
    const expectedAction = {
      type: UPDATE_TILE,
      pos: 1,
      tileId: 2,
    };

    expect(updateTile(1, 2)).toEqual(expectedAction);
  });
});

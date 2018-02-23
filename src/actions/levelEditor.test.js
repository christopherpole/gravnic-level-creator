import {
  UPDATE_TILE,
  SELECT_TILE,
  updateTile,
  selectTile,
} from './levelEditor';

describe('The level editor actions', () => {
  it('Should create an action select a tile', () => {
    const expectedAction = {
      type: SELECT_TILE,
      selectedTileId: 2,
    };

    expect(selectTile(2)).toEqual(expectedAction);
  });

  it('Should create an action to update a tile', () => {
    const expectedAction = {
      type: UPDATE_TILE,
      position: 1,
    };

    expect(updateTile(1)).toEqual(expectedAction);
  });
});

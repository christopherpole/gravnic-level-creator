import {
  UPDATE_TILE,
  SELECT_TILE,
  EDIT_LEVEL,
  PREVIEW_LEVEL,
  RESET_GRID,
  updateTile,
  selectTile,
  editLevel,
  previewLevel,
  resetGrid,
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

  it('Should create an action to preview the level', () => {
    const expectedAction = {
      type: PREVIEW_LEVEL,
    };

    expect(previewLevel()).toEqual(expectedAction);
  });

  it('Should create an action to edit the level', () => {
    const expectedAction = {
      type: EDIT_LEVEL,
    };

    expect(editLevel()).toEqual(expectedAction);
  });

  it('Should create an action to reset the grid', () => {
    const expectedAction = {
      type: RESET_GRID,
    };

    expect(resetGrid()).toEqual(expectedAction);
  });
});

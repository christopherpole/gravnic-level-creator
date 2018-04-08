import { spy } from 'sinon';
import { convertTilesToGameState } from 'gravnic-game';
import testLevels from '../data/testLevels';

import {
  UPDATE_TILE,
  SELECT_TILE,
  EDIT_LEVEL,
  PREVIEW_LEVEL,
  RESET_GRID,
  START_DRAG,
  STOP_DRAG,
  SET_STARS,
  updateTile,
  selectTile,
  editLevel,
  previewLevel,
  resetGrid,
  startDrag,
  stopDrag,
  setStars,
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

  it('Should create an action to preview a level', () => {
    const fn = previewLevel();
    const dispatchSpy = spy();
    const getState = () => ({
      levelEditor: {
        tiles: testLevels[0].tiles,
      },
    });

    expect(typeof fn).toBe('function');
    fn(dispatchSpy, getState);
    expect(dispatchSpy.calledOnce).toBe(true);
    expect(
      dispatchSpy.calledWith({
        type: PREVIEW_LEVEL,
        gameState: convertTilesToGameState(testLevels[0].tiles),
      }),
    ).toBe(true);
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

  it('Should create an action to start dragging on the grid', () => {
    const expectedAction = {
      type: START_DRAG,
    };

    expect(startDrag()).toEqual(expectedAction);
  });

  it('Should create an action to stop dragging on the grid', () => {
    const expectedAction = {
      type: STOP_DRAG,
    };

    expect(stopDrag()).toEqual(expectedAction);
  });

  it('Should create an action to set the number of stars for a stars array index', () => {
    const expectedAction = {
      type: SET_STARS,
      starsIndex: 1,
      stars: 3,
    };

    expect(setStars(1, 3)).toEqual(expectedAction);
  });
});

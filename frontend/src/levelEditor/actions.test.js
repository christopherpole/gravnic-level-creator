import { spy } from 'sinon';
import { ENTITIES } from 'gravnic-game';
import {
  UPDATE_TILE,
  SELECT_TILE,
  RESET_GRID,
  START_DRAG,
  STOP_DRAG,
  SET_STARS,
  updateTile,
  selectTile,
  resetGrid,
  startDrag,
  stopDrag,
  setStars,
} from './actions';

describe('The level editor actions', () => {
  describe('selectTile()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: SELECT_TILE,
        selectedTileId: ENTITIES.BLOCK,
      };

      expect(selectTile(ENTITIES.BLOCK)).toEqual(expectedAction);
    });
  });

  describe('updateTile()', () => {
    const levelEditorTiles = [
      {
        position: 1,
        selectedTileId: '1',
      },
      {
        position: 2,
        selectedTileId: '2',
      },
      {
        position: 3,
        selectedTileId: '1',
      },
    ];

    it("Doesn't create an action when the tile doesn't update", () => {
      const fn = updateTile(2);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          selectedTileId: '2',
          tiles: levelEditorTiles,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.called).toBe(false);
    });

    it('Creates the action when the tile tile updates', () => {
      const fn = updateTile(3);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          selectedTileId: '2',
          tiles: levelEditorTiles,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: UPDATE_TILE,
          position: 3,
        }),
      ).toBe(true);
    });
  });

  describe('resetGrid()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: RESET_GRID,
      };

      expect(resetGrid()).toEqual(expectedAction);
    });
  });

  describe('startDrag()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: START_DRAG,
      };

      expect(startDrag()).toEqual(expectedAction);
    });
  });

  describe('startDrag()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: STOP_DRAG,
      };

      expect(stopDrag()).toEqual(expectedAction);
    });
  });

  describe('setStars()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: SET_STARS,
        starsIndex: 1,
        stars: 3,
      };

      expect(setStars(1, 3)).toEqual(expectedAction);
    });
  });
});

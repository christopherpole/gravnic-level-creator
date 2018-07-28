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
import availableTiles from '../config/tiles';

describe('The level editor actions', () => {
  describe('selectTile()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: SELECT_TILE,
        selectedTileId: ENTITIES.BLOCK.id,
      };

      expect(selectTile(ENTITIES.BLOCK.id)).toEqual(expectedAction);
    });
  });

  describe('updateTile()', () => {
    const levelEditorTiles = [
      {
        position: 1,
        selectedTileId: availableTiles[0].id,
      },
      {
        position: 2,
        selectedTileId: availableTiles[1].id,
      },
      {
        position: 3,
        selectedTileId: availableTiles[0].id,
      },
    ];

    it("Doesn't create an action when the tile doesn't update", () => {
      const fn = updateTile(2);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          selectedTileId: availableTiles[1].id,
          tiles: levelEditorTiles,
          linkFromTilePos: null,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.called).toBe(false);
    });

    it('Creates the action when the tile updates after being clicked', () => {
      const fn = updateTile(3, true);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          selectedTileId: availableTiles[1].id,
          tiles: levelEditorTiles,
          linkFromTilePos: null,
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

    it("Doesn't create an action if the tile should be updated but we're just hovering over it", () => {
      const fn = updateTile(3);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          selectedTileId: availableTiles[1].id,
          tiles: levelEditorTiles,
          linkFromTilePos: null,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(false);
    });

    it("Creates an action if the tile should be updated and we're dragging over it", () => {
      const fn = updateTile(3);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          selectedTileId: availableTiles[1].id,
          tiles: levelEditorTiles,
          linkFromTilePos: null,
          dragging: true,
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

    it("Doesn't create an action when the tile updates but we're creating a link", () => {
      const fn = updateTile(2);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          selectedTileId: availableTiles[1].id,
          tiles: levelEditorTiles,
          dragging: true,
          linkFromTilePos: 3,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.called).toBe(false);
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
    const levelEditorTiles = [
      {
        position: 1,
        selectedTileId: availableTiles[0].id,
      },
      {
        position: 2,
        selectedTileId: availableTiles[1].id,
      },
      {
        position: 3,
        selectedTileId: availableTiles[0].id,
      },
    ];

    it('Creates the correct action when dragging on a non-linkable tile entity', () => {
      const fn = startDrag(2);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          tiles: levelEditorTiles,
          availableTiles,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: START_DRAG,
          linkFromTilePos: null,
        }),
      ).toBe(true);
    });

    it('Creates the correct action when dragging on a linkable tile entity', () => {
      const fn = startDrag(2);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          tiles: [
            levelEditorTiles[0],
            {
              ...levelEditorTiles[1],
              selectedTileId: availableTiles.find(availableTile => availableTile.entity.linkable)
                .id,
            },
            levelEditorTiles[2],
          ],
          availableTiles,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: START_DRAG,
          linkFromTilePos: 2,
        }),
      ).toBe(true);
    });
  });

  describe('stopDrag()', () => {
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

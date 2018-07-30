import { spy } from 'sinon';
import { ENTITIES } from 'gravnic-game';
import {
  UPDATE_TILE,
  SELECT_TILE,
  RESET_GRID,
  START_DRAG,
  STOP_DRAG,
  SET_STARS,
  SET_LINK_TO_TILE_POS,
  CREATE_LINK,
  updateTile,
  selectTile,
  resetGrid,
  startDrag,
  stopDrag,
  setStars,
  mouseoverTile,
  createLink,
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

    it('Creates an action when the tile updates', () => {
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
    let levelEditorTiles;

    const unlinkableTileId = availableTiles.find(availableTile => !availableTile.entity.linkable)
      .id;
    const linkableTileId = availableTiles.find(availableTile => availableTile.entity.linkable).id;

    beforeEach(() => {
      levelEditorTiles = [
        {
          position: 1,
          selectedTileId: unlinkableTileId,
        },
        {
          position: 2,
          selectedTileId: unlinkableTileId,
        },
        {
          position: 3,
          selectedTileId: unlinkableTileId,
        },
        {
          position: 4,
          selectedTileId: linkableTileId,
        },
      ];
    });

    it('Creates the STOP_DRAG action', () => {
      const fn = stopDrag();
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          availableTiles,
          tiles: levelEditorTiles,
          links: [{ form: 1, to: 2 }],
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: STOP_DRAG,
        }),
      ).toBe(true);
    });

    it('Creates the STOP_DRAG action and the CREATE_LINK actions when creating a new valid link', () => {
      const fn = stopDrag();
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          availableTiles,
          tiles: levelEditorTiles,
          links: [{ from: 2, to: 3 }],
          linkFromTilePos: 1,
          linkToTilePos: 4,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledTwice).toBe(true);
      expect(
        dispatchSpy.getCall(0).calledWith({
          type: CREATE_LINK,
        }),
      ).toBe(true);
      expect(
        dispatchSpy.getCall(1).calledWith({
          type: STOP_DRAG,
        }),
      ).toBe(true);
    });

    it('Creates the STOP_DRAG action but not the CREATE_LINK action when creating duplicated link', () => {
      const fn = stopDrag();
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          availableTiles,
          tiles: levelEditorTiles,
          links: [{ from: 2, to: 4 }],
          linkFromTilePos: 2,
          linkToTilePos: 4,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: STOP_DRAG,
        }),
      ).toBe(true);
    });

    it('Creates the STOP_DRAG action but not the CREATE_LINK action when creating duplicated link (reversed)', () => {
      const fn = stopDrag();
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          availableTiles,
          tiles: levelEditorTiles,
          links: [{ from: 2, to: 4 }],
          linkFromTilePos: 4,
          linkToTilePos: 2,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: STOP_DRAG,
        }),
      ).toBe(true);
    });

    it('Creates the STOP_DRAG action but not the CREATE_LINK action when linking a tile to itself', () => {
      const fn = stopDrag();
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          availableTiles,
          tiles: levelEditorTiles,
          links: [{ from: 4, to: 4 }],
          linkFromTilePos: 4,
          linkToTilePos: 4,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: STOP_DRAG,
        }),
      ).toBe(true);
    });

    it('Creates the STOP_DRAG action but not the CREATE_LINK action when linking to a non-linkable tile', () => {
      const fn = stopDrag();
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          availableTiles,
          tiles: levelEditorTiles,
          links: [{ from: 2, to: 4 }],
          linkFromTilePos: 2,
          linkToTilePos: 3,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: STOP_DRAG,
        }),
      ).toBe(true);
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

  describe('createLink()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: CREATE_LINK,
      };

      expect(createLink()).toEqual(expectedAction);
    });
  });

  describe('mouseoverTile()', () => {
    let levelEditorTiles;

    beforeEach(() => {
      levelEditorTiles = [
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
    });

    it("Doesn't create an action if we're not dragging", () => {
      const fn = mouseoverTile(2);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          tiles: levelEditorTiles,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(false);
    });

    it("Doesn't create an action if we're dragging and the tile is not to be updated", () => {
      const fn = mouseoverTile(2);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          selectedTileId: availableTiles[1].id,
          tiles: levelEditorTiles,
          dragging: true,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(false);
    });

    it("Creates an action if we're dragging and the tile is to be updated", () => {
      const fn = mouseoverTile(2);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          selectedTileId: availableTiles[0].id,
          tiles: levelEditorTiles,
          dragging: true,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: UPDATE_TILE,
          position: 2,
        }),
      ).toBe(true);
    });

    it("Creates a action to update the cursor position when we're linking entities", () => {
      const fn = mouseoverTile(2);
      const dispatchSpy = spy();
      const getState = () => ({
        levelEditor: {
          selectedTileId: availableTiles[0].id,
          tiles: levelEditorTiles,
          dragging: true,
          linkFromTilePos: 1,
        },
      });

      expect(typeof fn).toBe('function');
      fn(dispatchSpy, getState);
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(
        dispatchSpy.calledWith({
          type: SET_LINK_TO_TILE_POS,
          position: 2,
        }),
      ).toBe(true);
    });
  });
});

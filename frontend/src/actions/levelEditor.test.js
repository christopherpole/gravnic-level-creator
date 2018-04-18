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
} from './levelEditor';

describe('The level editor actions', () => {
  describe('selectTile()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: SELECT_TILE,
        selectedTileId: 2,
      };

      expect(selectTile(2)).toEqual(expectedAction);
    });
  });

  describe('updateTile()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: UPDATE_TILE,
        position: 1,
      };

      expect(updateTile(1)).toEqual(expectedAction);
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

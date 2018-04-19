import { createNewLevel, makeActionCreator } from './index';
import { GRID_SIZE, MIN_MOVES } from '../config/settings';

describe('The utils', () => {
  describe('createNewLevel()', () => {
    it('Returns a new level template', () => {
      const newLevel = createNewLevel(5);

      expect(typeof newLevel.id).toBe('string');
      expect(typeof newLevel.name).toBe('string');
      expect(newLevel.tiles instanceof Array).toBe(true);
      expect(newLevel.tiles.length).toBe(GRID_SIZE * GRID_SIZE);
      expect(typeof newLevel.tiles[0]).toBe('object');
      expect(typeof newLevel.tiles[0].position).toBe('number');
      expect(typeof newLevel.tiles[0].selectedTileId).toBe('number');
      expect(newLevel.stars).toEqual([MIN_MOVES, MIN_MOVES + 1, MIN_MOVES + 2]);
      expect(newLevel.position).toBe(5);
    });
  });

  describe('makeActionCreator()', () => {
    it('Creates new action creators', () => {
      const action = makeActionCreator('CREATE_LEVEL', 'level');

      expect(typeof action).toBe('function');
      expect(action({ name: 'New level' })).toEqual({
        type: 'CREATE_LEVEL',
        level: { name: 'New level' },
      });
    });
  });
});

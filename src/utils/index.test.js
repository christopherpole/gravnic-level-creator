import { createNewLevel } from './index';
import { GRID_SIZE } from '../config/settings';

describe('The utils', () => {
  describe('The function to create a new level template', () => {
    it('Should return a new level template', () => {
      const newLevel = createNewLevel();

      expect(typeof newLevel.id).toBe('string');
      expect(typeof newLevel.name).toBe('string');
      expect(newLevel.tiles instanceof Array).toBe(true);
      expect(newLevel.tiles.length).toBe(GRID_SIZE * GRID_SIZE);
      expect(typeof newLevel.tiles[0]).toBe('object');
      expect(typeof newLevel.tiles[0].position).toBe('number');
      expect(typeof newLevel.tiles[0].selectedTileId).toBe('number');
    });
  });
});

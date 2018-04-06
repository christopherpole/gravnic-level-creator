import shortid from 'shortid';

import { GRID_SIZE, MIN_MOVES } from '../config/settings';

export const createNewLevel = pos => ({
  id: shortid.generate(),
  name: 'New level',
  tiles: [...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => ({
    position: index,
    selectedTileId: 0,
  })),
  stars: [MIN_MOVES, MIN_MOVES + 1, MIN_MOVES + 2],
  position: pos,
});

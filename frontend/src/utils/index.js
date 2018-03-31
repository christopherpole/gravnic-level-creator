import shortid from 'shortid';

import { GRID_SIZE } from '../config/settings';

export const createNewLevel = () => ({
  id: shortid.generate(),
  name: 'New level',
  tiles: [...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => ({
    position: index,
    selectedTileId: 0,
  })),
  stars: [1, 2, 3],
});

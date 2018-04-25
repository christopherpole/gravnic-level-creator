import shortid from 'shortid';
import { ENTITIES } from 'gravnic-game';

import { GRID_SIZE, MIN_MOVES } from 'config/settings';

export const createNewLevel = pos => ({
  id: shortid.generate(),
  name: 'New level',
  tiles: [...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => ({
    position: index,
    selectedTileId: ENTITIES.NONE,
  })),
  stars: [MIN_MOVES, MIN_MOVES + 1, MIN_MOVES + 2],
  position: pos,
});

export function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };

    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });

    return action;
  };
}

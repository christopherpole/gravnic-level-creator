import { ENTITIES } from 'gravnic-game';

import { GRID_SIZE } from 'config/settings';
import { getEntitiesData } from './selectors';

describe('getEntitiesData()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelPreview: {
        gameState: [
          [{}, { staticEntity: { id: 1, entityId: ENTITIES.FLOOR } }, {}],
          [
            { staticEntity: { id: 2, entityId: ENTITIES.FLOOR } },
            {
              staticEntity: { id: 3, entityId: ENTITIES.FLOOR },
              movableEntity: { id: 4, entityId: ENTITIES.BLOCK, fading: true },
            },
            { staticEntity: { id: 5, entityId: ENTITIES.FLOOR } },
          ],
          [{}, { id: 6, entityId: ENTITIES.FLOOR }, {}],
        ],
      },
    };
  });

  it('Converts the game state into raw entity data for the preview area to work with', () => {
    const entitiesData = getEntitiesData(state);
    expect(entitiesData).toEqual({
      '1': { entityId: ENTITIES.FLOOR, xPos: GRID_SIZE * 1, yPos: 0, isMovableEntity: false },
      '2': { entityId: ENTITIES.FLOOR, xPos: 0, yPos: GRID_SIZE * 1, isMovableEntity: false },
      '3': {
        entityId: ENTITIES.FLOOR,
        xPos: GRID_SIZE * 1,
        yPos: GRID_SIZE * 1,
        isMovableEntity: false,
      },
      '4': {
        entityId: ENTITIES.BLOCK,
        xPos: GRID_SIZE * 1,
        yPos: GRID_SIZE * 1,
        fading: true,
        isMovableEntity: true,
      },
      '5': {
        entityId: ENTITIES.FLOOR,
        xPos: GRID_SIZE * 2,
        yPos: GRID_SIZE * 1,
        isMovableEntity: false,
      },
    });
  });
});

import { GRID_SIZE } from 'config/settings';
import { getEntitiesData } from './selectors';

describe('getEntitiesData()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelPreview: {
        gameState: [
          [{}, { staticEntity: { id: 1, entityId: 1 } }, {}],
          [
            { staticEntity: { id: 2, entityId: 1 } },
            {
              staticEntity: { id: 3, entityId: 1 },
              movableEntity: { id: 4, entityId: 2, fading: true },
            },
            { staticEntity: { id: 5, entityId: 1 } },
          ],
          [{}, { id: 6, entityId: 1 }, {}],
        ],
      },
    };
  });

  it('Converts the game state into raw entity data for the preview area to work with', () => {
    const entitiesData = getEntitiesData(state);
    expect(entitiesData).toEqual({
      '1': { entityId: 1, xPos: GRID_SIZE * 1, yPos: 0 },
      '2': { entityId: 1, xPos: 0, yPos: GRID_SIZE * 1 },
      '3': { entityId: 1, xPos: GRID_SIZE * 1, yPos: GRID_SIZE * 1 },
      '4': { entityId: 2, xPos: GRID_SIZE * 1, yPos: GRID_SIZE * 1, fading: true },
      '5': { entityId: 1, xPos: GRID_SIZE * 2, yPos: GRID_SIZE * 1 },
    });
  });
});

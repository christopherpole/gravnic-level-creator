import { ENTITIES } from 'gravnic-game';
import { findQuickestSolution } from './solver';

describe('findQuickestSolution()', () => {
  it('Returns an empty array if the level is already complete', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: null,
        },
      ],
    ];

    const solution = findQuickestSolution(gameState);
    expect(solution).toEqual([]);
  });

  it('Returns "false" if the level is unsolvable in the given moves', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
      ],
    ];

    const solution = findQuickestSolution(gameState);
    expect(solution).toEqual(false);
  });
});

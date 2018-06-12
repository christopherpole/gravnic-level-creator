import { ENTITIES, MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT } from 'gravnic-game';
import { findQuickestSolution, searchGameTree } from './solver';

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

    const solution = findQuickestSolution(gameState, 2);
    expect(solution).toEqual([]);
  });

  it('Returns "false" if level can not be solved in given number of moves', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 4, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 6 },
        },
      ],
    ];

    const solution = findQuickestSolution(gameState, 1);
    expect(solution).toEqual(false);
  });

  it('Finds a solution in the shortest possible number of moves', () => {
    const gameState = [
      [
        { staticEntity: { id: 1, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 2, entityId: ENTITIES.FLOOR }, movableEntity: null },
        {
          staticEntity: { id: 4, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 3 },
        },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
      ],
      [
        { staticEntity: { id: 6, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 7, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 8, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 9, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 10, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 12, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 11 },
        },
        { staticEntity: { id: 13, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 14, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
    ];

    const solution = findQuickestSolution(gameState, 5);
    expect(solution).toEqual(['MOVE_RIGHT', 'MOVE_UP', 'MOVE_LEFT', 'MOVE_UP']);
  });
});

describe('searchGameTree()', () => {
  it('Returns "false" if there are no moves remaining', () => {
    const solution = searchGameTree([], [], 0);
    expect(solution).toEqual(false);
  });

  it('Returns the correct solution for a level that can be solved in one move', () => {
    const gameState = [
      [
        {
          staticEntity: { id: 2, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 1 },
        },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 4, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 6, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 5 },
        },
      ],
    ];

    const solution = searchGameTree(gameState, [], 1);
    expect(solution).toEqual([MOVE_UP]);
  });

  it('Returns the correct solution for a level that can be solved in two moves', () => {
    const gameState = [
      [
        { staticEntity: { id: 1, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 2, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: { id: 3, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        { staticEntity: { id: 4, entityId: ENTITIES.FLOOR }, movableEntity: null },
        { staticEntity: null, movableEntity: null },
        { staticEntity: { id: 5, entityId: ENTITIES.FLOOR }, movableEntity: null },
      ],
      [
        {
          staticEntity: { id: 7, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 6 },
        },
        { staticEntity: null, movableEntity: null },
        {
          staticEntity: { id: 9, entityId: ENTITIES.FLOOR },
          movableEntity: { entityId: ENTITIES.BLOCK, color: '#ff0000', id: 8 },
        },
      ],
    ];

    const solution = searchGameTree(gameState, [], 2);
    expect(solution).toEqual([MOVE_UP, MOVE_RIGHT]);
  });
});

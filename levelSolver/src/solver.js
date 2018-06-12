import { getInitialGameState, levelIsComplete } from 'gravnic-game';

/**
 * Find the quickest solution available for the given game state
 * @param {Object[][]} gameState - The starting Gravnic game state
 * @returns {String[]} The solution as an array of moves, or "false" if the level cannot be solved
 */
export const findQuickestSolution = gameState => {
  const initialGameState = getInitialGameState(gameState);
  if (levelIsComplete(initialGameState[initialGameState.length - 1])) return [];
  return false;
};

import {
  getInitialGameState,
  levelIsComplete,
  changeGravityDirection,
  MOVE_UP,
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
} from 'gravnic-game';

const moves = [MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT];

/**
 * Performs a depth-first search of the game tree of the given game state
 * @param {Object[][]} gameState - The Gravnic game state to evaluate
 * @param {String[]} previousMoves - The moves that have already been performed on the given game state
 * @param {Number} movesRemaining - The remaining depth of the game tree to search
 * @returns {String[]} The solution as an array of moves, or "false" if the level cannot be solved
 */
export const searchGameTree = (gameState, previousMoves, movesRemaining) => {
  if (!movesRemaining) return false;
  let newGameState;

  //  For each move direction...
  for (let i = 0; i < moves.length; i += 1) {
    //  Apply the current move
    newGameState = changeGravityDirection(gameState, moves[i]);

    //  Return the solution if this level is now solved
    if (levelIsComplete(newGameState[newGameState.length - 1])) {
      return [...previousMoves, moves[i]];
    }

    //  If unsolved, search the game tree further
    const result = searchGameTree(
      newGameState[newGameState.length - 1],
      [...previousMoves, moves[i]],
      movesRemaining - 1,
    );

    if (result) return result;
  }

  return false;
};

/**
 * Find the quickest solution available for the given game state
 * @param {Object[][]} gameState - The starting Gravnic game state
 * @returns {String[]} The solution as an array of moves, or "false" if the level cannot be solved
 */
export const findQuickestSolution = (gameState, maxMoves) => {
  const initialGameState = getInitialGameState(gameState);
  if (levelIsComplete(initialGameState[initialGameState.length - 1])) return [];

  for (let i = 0; i < maxMoves; i += 1) {
    const result = searchGameTree(gameState, [], i);

    if (result) return result;
  }

  return false;
};

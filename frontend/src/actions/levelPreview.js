import { changeGravityDirection } from 'gravnic-game';

export const MAKE_MOVE = 'MAKE_MOVE';

export const makeMove = direction => (dispatch, getState) => {
  const { gameState } = getState().levelPreview;
  const gameStates = changeGravityDirection(gameState, direction);

  dispatch({
    type: MAKE_MOVE,
    gameState: gameStates[gameStates.length - 1],
  });
};

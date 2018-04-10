import { MOVE_LEFT } from 'gravnic-game';
import reducer, { initialState } from './levelPreview';
import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  CHANGE_GRAVITY_DIRECTION,
  UPDATE_GAME_STATE,
  ENTITIES_STOPPED_MOVING,
  RESTART_LEVEL,
  UNDO_MOVE,
} from '../actions/levelPreview';

describe('The level editor reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('Should handle the PREVIEW_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          gameHistory: [[1, 2, 3]],
          entitiesMoving: true,
          gravityDirection: MOVE_LEFT,
        },
        {
          type: PREVIEW_LEVEL,
          gameState: [4, 5, 6],
        },
      ),
    ).toEqual({
      ...initialState,
      previewing: true,
      gameState: [4, 5, 6],
      gameHistory: [[4, 5, 6]],
      entitiesMoving: initialState.entitiesMoving,
      gravityDirection: initialState.gravityDirection,
    });
  });

  it('Should handle the EDIT_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          previewing: true,
        },
        {
          type: EDIT_LEVEL,
        },
      ),
    ).toEqual({
      ...initialState,
      previewing: false,
    });
  });

  it('Should handle the CHANGE_GRAVITY_DIRECTION action', () => {
    expect(
      reducer(
        {
          ...initialState,
          gameState: [1, 2, 3],
        },
        {
          type: CHANGE_GRAVITY_DIRECTION,
          direction: MOVE_LEFT,
        },
      ),
    ).toEqual({
      ...initialState,
      gravityDirection: MOVE_LEFT,
      entitiesMoving: true,
      gameState: [1, 2, 3],
      gameHistory: [[[1, 2, 3]]],
    });
  });

  it('Should handle the UPDATE_GAME_STATE action', () => {
    expect(
      reducer(
        { ...initialState, gameHistory: [[[4, 5, 6]]] },
        {
          type: UPDATE_GAME_STATE,
          gameState: [1, 2, 3],
        },
      ),
    ).toEqual({
      ...initialState,
      gameState: [1, 2, 3],
      gameHistory: [[[4, 5, 6], [1, 2, 3]]],
    });
  });

  it('Should handle the ENTITIES_STOPPED_MOVING action', () => {
    expect(
      reducer(
        {
          ...initialState,
          entitiesMoving: true,
        },
        {
          type: ENTITIES_STOPPED_MOVING,
        },
      ),
    ).toEqual({
      ...initialState,
      entitiesMoving: false,
    });
  });

  it('Should handle the RESTART_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          gameHistory: [[1, 2, 3]],
          entitiesMoving: true,
          gravityDirection: MOVE_LEFT,
        },
        {
          type: RESTART_LEVEL,
          gameState: [4, 5, 6],
        },
      ),
    ).toEqual({
      ...initialState,
      entitiesMoving: initialState.entitiesMoving,
      gameHistory: [[4, 5, 6]],
      gravityDirection: initialState.gravityDirection,
      gameState: [4, 5, 6],
    });
  });

  it('Should handle the UNDO_MOVE action', () => {
    expect(
      reducer(
        {
          ...initialState,
          gameHistory: [[[1, 2, 3]], [[4, 5, 6], [7, 8, 9]]],
          gameState: [7, 8, 9],
        },
        {
          type: UNDO_MOVE,
        },
      ),
    ).toEqual({
      ...initialState,
      gameHistory: [[[1, 2, 3]]],
      gameState: [4, 5, 6],
    });

    //  Doesn't do anything if the history isn't big enough
    expect(
      reducer(
        {
          ...initialState,
          gameHistory: [[[1, 2, 3]]],
          gameState: [1, 2, 3],
        },
        {
          type: UNDO_MOVE,
        },
      ),
    ).toEqual({
      ...initialState,
      gameHistory: [[[1, 2, 3]]],
      gameState: [1, 2, 3],
    });
  });
});

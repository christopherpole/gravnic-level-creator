import { MOVE_LEFT } from 'gravnic-game';
import reducer, { initialState } from './levelPreview';
import { PREVIEW_LEVEL } from '../actions/levelEditor';
import {
  CHANGE_GRAVITY_DIRECTION,
  UPDATE_GAME_STATE,
  ENTITIES_STOPPED_MOVING,
} from '../actions/levelPreview';

describe('The level editor reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('Should handle the PREVIEW_LEVEL action', () => {
    expect(
      reducer(undefined, {
        type: PREVIEW_LEVEL,
        gameState: [[1, 2], [3, 2]],
      }),
    ).toEqual({
      ...initialState,
      gameState: [[1, 2], [3, 2]],
    });
  });

  it('Should handle the CHANGE_GRAVITY_DIRECTION action', () => {
    expect(
      reducer(undefined, {
        type: CHANGE_GRAVITY_DIRECTION,
        direction: MOVE_LEFT,
      }),
    ).toEqual({
      ...initialState,
      gravityDirection: MOVE_LEFT,
      entitiesMoving: true,
    });
  });

  it('Should handle the UPDATE_GAME_STATE action', () => {
    expect(
      reducer(undefined, {
        type: UPDATE_GAME_STATE,
        gameState: [1, 2, 3],
      }),
    ).toEqual({
      ...initialState,
      gameState: [1, 2, 3],
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
});

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
  let testGameHistory;
  let testGameState;

  beforeEach(() => {
    testGameHistory = [
      [
        [[{}, { staticEntity: { id: 111, entityId: 2 } }, {}], [{}, {}, {}], [{}, {}, {}]],
        [[{}, {}, {}], [{}, { staticEntity: { id: 111, entityId: 2 } }, {}], [{}, {}, {}]],
        [[{}, {}, {}], [{}, {}, {}], [{}, { staticEntity: { id: 111, entityId: 2 } }, {}]],
      ],
      [
        [[{}, {}, {}], [{}, {}, {}], [{}, { staticEntity: { id: 111, entityId: 2 } }, {}]],
        [[{}, {}, {}], [{}, { staticEntity: { id: 111, entityId: 2 } }, {}], [{}, {}, {}]],
        [[{}, { staticEntity: { id: 111, entityId: 2 } }, {}], [{}, {}, {}], [{}, {}, {}]],
      ],
    ];

    testGameState = [
      [{}, {}, {}],
      [{}, { staticEntity: { id: 222, entityId: 2 } }, {}],
      [{}, {}, {}],
    ];
  });

  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('Should handle the PREVIEW_LEVEL action', () => {
    expect(
      reducer(
        {
          ...initialState,
          entitiesMoving: true,
          gravityDirection: MOVE_LEFT,
        },
        {
          type: PREVIEW_LEVEL,
          gameState: testGameState,
        },
      ),
    ).toEqual({
      ...initialState,
      previewing: true,
      gameState: testGameState,
      gameHistory: [testGameState],
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
          gameState: testGameState,
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
      gameState: testGameState,
      gameHistory: [[testGameState]],
    });
  });

  it('Should handle the UPDATE_GAME_STATE action', () => {
    expect(
      reducer(
        { ...initialState, gameHistory: testGameHistory },
        {
          type: UPDATE_GAME_STATE,
          gameState: testGameState,
        },
      ),
    ).toEqual({
      ...initialState,
      gameState: testGameState,
      gameHistory: [
        ...testGameHistory.slice(0, testGameHistory.length - 1),
        [...testGameHistory[testGameHistory.length - 1], testGameState],
      ],
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
          gameHistory: testGameHistory,
          entitiesMoving: true,
          gravityDirection: MOVE_LEFT,
        },
        {
          type: RESTART_LEVEL,
        },
      ),
    ).toEqual({
      ...initialState,
      entitiesMoving: initialState.entitiesMoving,
      gameHistory: [testGameHistory[0]],
      gravityDirection: initialState.gravityDirection,
      gameState: testGameHistory[0],
    });
  });

  it('Should handle the UNDO_MOVE action', () => {
    expect(
      reducer(
        {
          ...initialState,
          gameHistory: testGameHistory,
          gameState:
            testGameHistory[testGameHistory.length - 1][
              testGameHistory[testGameHistory.length - 1].length
            ],
        },
        {
          type: UNDO_MOVE,
        },
      ),
    ).toEqual({
      ...initialState,
      gameHistory: testGameHistory.slice(0, testGameHistory.length - 1),
      gameState: testGameHistory[testGameHistory.length - 1][0],
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

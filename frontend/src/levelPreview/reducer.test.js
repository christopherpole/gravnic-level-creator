import { MOVE_LEFT, ENTITIES } from 'gravnic-game';
import reducer, { initialState } from './reducer';
import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  CHANGE_GRAVITY_DIRECTION,
  UPDATE_GAME_STATE,
  ENTITIES_STOPPED_MOVING,
  RESTART_LEVEL,
  UNDO_MOVE,
  SET_GAME_SPEED,
} from './actions';

describe('The level editor reducer', () => {
  let testGameHistory;
  let testGameState;

  beforeEach(() => {
    testGameHistory = [
      [
        [
          [{}, { staticEntity: { id: 111, entityId: ENTITIES.BLOCK } }, {}],
          [{}, {}, {}],
          [{}, {}, {}],
        ],
        [
          [{}, {}, {}],
          [{}, { staticEntity: { id: 111, entityId: ENTITIES.BLOCK } }, {}],
          [{}, {}, {}],
        ],
        [
          [{}, {}, {}],
          [{}, {}, {}],
          [{}, { staticEntity: { id: 111, entityId: ENTITIES.BLOCK } }, {}],
        ],
      ],
      [
        [
          [{}, {}, {}],
          [{}, {}, {}],
          [{}, { staticEntity: { id: 111, entityId: ENTITIES.BLOCK } }, {}],
        ],
        [
          [{}, {}, {}],
          [{}, { staticEntity: { id: 111, entityId: ENTITIES.BLOCK } }, {}],
          [{}, {}, {}],
        ],
        [
          [{}, { staticEntity: { id: 111, entityId: ENTITIES.BLOCK } }, {}],
          [{}, {}, {}],
          [{}, {}, {}],
        ],
      ],
    ];

    testGameState = [
      [{}, {}, {}],
      [{}, { staticEntity: { id: 222, entityId: ENTITIES.BLOCK } }, {}],
      [{}, {}, {}],
    ];
  });

  it('Should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  describe('PREVIEW_LEVEL', () => {
    it('Handles the action correctly', () => {
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
  });

  describe('EDIT_LEVEL', () => {
    it('Handles the action correctly', () => {
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
  });

  describe('CHANGE_GRAVITY_DIRECTION', () => {
    it('Handles the action correctly', () => {
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
  });

  describe('UPDATE_GAME_STATE', () => {
    it('Handles the action correctly', () => {
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
  });

  describe('ENTITIES_STOPPED_MOVING', () => {
    it('Handles the action correctly', () => {
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

  describe('RESTART_LEVEL', () => {
    it('Handles the action correctly', () => {
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
  });

  describe('UNDO_MOVE', () => {
    it('Handles the action correctly', () => {
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
    });

    it('Handles the action correctly if there are no more moves to undo', () => {
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

  describe('SET_GAME_SPEED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...initialState,
            gameSpeed: 100,
          },
          {
            type: SET_GAME_SPEED,
            gameSpeed: 200,
          },
        ),
      ).toEqual({
        ...initialState,
        gameSpeed: 200,
      });
    });
  });
});

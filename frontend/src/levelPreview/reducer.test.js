import { MOVE_LEFT, MOVE_RIGHT, ENTITIES } from 'gravnic-game';
import reducer, { initialState } from './reducer';
import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  MAKE_MOVE,
  MAKE_MOVE_STEP,
  MAKE_MOVE_FINISHED,
  RESTART_LEVEL,
  UNDO_MOVE,
  UNDO_MOVE_STEP,
  UNDO_MOVE_FINISHED,
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
        moveHistory: initialState.moveHistory,
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

  describe('MAKE_MOVE', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...initialState,
            gameState: testGameState,
            moveHistory: [MOVE_RIGHT],
          },
          {
            type: MAKE_MOVE,
            direction: MOVE_LEFT,
          },
        ),
      ).toEqual({
        ...initialState,
        gravityDirection: MOVE_LEFT,
        entitiesMoving: true,
        gameState: testGameState,
        gameHistory: [[testGameState]],
        moveHistory: [MOVE_RIGHT, MOVE_LEFT],
      });
    });
  });

  describe('MAKE_MOVE_STEP', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          { ...initialState, gameHistory: testGameHistory },
          {
            type: MAKE_MOVE_STEP,
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

  describe('MAKE_MOVE_FINISHED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...initialState,
            entitiesMoving: true,
          },
          {
            type: MAKE_MOVE_FINISHED,
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
            moveHistory: [MOVE_LEFT, MOVE_LEFT],
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
        moveHistory: [],
      });
    });
  });

  describe('UNDO_MOVE', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...initialState,
            entitiesMoving: false,
            moveHistory: [MOVE_LEFT, MOVE_RIGHT],
          },
          {
            type: UNDO_MOVE,
          },
        ),
      ).toEqual({
        ...initialState,
        entitiesMoving: true,
        moveHistory: [MOVE_LEFT],
      });
    });
  });

  describe('UNDO_MOVE_STEP', () => {
    it('Handles the action correctly', () => {
      const gameHistoryLength = testGameHistory.length - 1;
      const latestMoveLength = testGameHistory[gameHistoryLength].length;

      expect(
        reducer(
          {
            ...initialState,
            gameHistory: testGameHistory,
            gameState: testGameHistory[gameHistoryLength][latestMoveLength],
          },
          {
            type: UNDO_MOVE_STEP,
          },
        ),
      ).toEqual({
        ...initialState,
        gameHistory: [
          ...testGameHistory.slice(0, gameHistoryLength),
          testGameHistory[gameHistoryLength].slice(0, latestMoveLength - 1),
        ],
        gameState: testGameHistory[gameHistoryLength][latestMoveLength - 2],
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
            type: UNDO_MOVE_STEP,
          },
        ),
      ).toEqual({
        ...initialState,
        gameHistory: [[[1, 2, 3]]],
        gameState: [1, 2, 3],
      });
    });
  });

  describe('UNDO_MOVE_FINISHED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...initialState,
            gameHistory: testGameHistory,
            entitiesMoving: true,
          },
          {
            type: UNDO_MOVE_FINISHED,
            entitiesMoving: false,
          },
        ),
      ).toEqual({
        ...initialState,
        gameHistory: testGameHistory.slice(0, testGameHistory.length - 1),
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

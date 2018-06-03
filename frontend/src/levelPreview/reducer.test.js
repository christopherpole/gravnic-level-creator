import { MOVE_LEFT, MOVE_RIGHT, ENTITIES } from 'gravnic-game';

import { FAST_GAME_MODIFIER } from 'config/settings';
import reducer, { initialState } from './reducer';
import {
  PREVIEW_LEVEL,
  EDIT_LEVEL,
  SET_GAME_STATE,
  MAKE_MOVE,
  MAKE_MOVE_FINISHED,
  RESTART_LEVEL,
  UNDO_MOVE,
  UNDO_MOVE_FINISHED,
  SET_GAME_SPEED,
  SET_FAST_MODE,
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
            moveHistory: [MOVE_LEFT],
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
        gameHistory: [[testGameState]],
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
            gravityDirection: MOVE_RIGHT,
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
        moveHistory: [MOVE_RIGHT, MOVE_LEFT],
      });
    });
  });

  describe('SET_GAME_STATE', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(undefined, {
          type: SET_GAME_STATE,
          gameState: testGameState,
        }),
      ).toEqual({
        ...initialState,
        gameState: testGameState,
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
            gameHistory: [[1, 2, 3]],
          },
          {
            type: MAKE_MOVE_FINISHED,
            gameStates: [4, 5, 6],
          },
        ),
      ).toEqual({
        ...initialState,
        entitiesMoving: false,
        gameHistory: [[1, 2, 3], [3, 4, 5, 6]],
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
        gameState: testGameHistory[0][0],
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
    it('Handles the action correctly fast mode is not on', () => {
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

    it('Handles the action correctly fast mode is on', () => {
      expect(
        reducer(
          {
            ...initialState,
            gameSpeed: 100,
            fastMode: true,
          },
          {
            type: SET_GAME_SPEED,
            gameSpeed: 200,
          },
        ),
      ).toEqual({
        ...initialState,
        fastMode: true,
        gameSpeed: 200 * FAST_GAME_MODIFIER,
      });
    });
  });

  describe('SET_FAST_MODE', () => {
    it('Handles the action correctly when setting fast mode to "true"', () => {
      expect(
        reducer(
          {
            ...initialState,
            fastMode: false,
            gameSpeed: 100,
          },
          {
            type: SET_FAST_MODE,
            fastMode: true,
          },
        ),
      ).toEqual({
        ...initialState,
        fastMode: true,
        gameSpeed: 100 * FAST_GAME_MODIFIER,
      });
    });

    it('Handles the action correctly when setting fast mode to "false"', () => {
      expect(
        reducer(
          {
            ...initialState,
            fastMode: true,
            gameSpeed: 200,
          },
          {
            type: SET_FAST_MODE,
            fastMode: false,
          },
        ),
      ).toEqual({
        ...initialState,
        fastMode: false,
        gameSpeed: 200 / FAST_GAME_MODIFIER,
      });
    });
  });
});

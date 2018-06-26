import { ENTITIES, MOVE_UP } from 'gravnic-game';

import { GRID_SIZE } from 'config/settings';
import { getEntitiesData, getLevelPreviewButtonDisabledStates } from './selectors';

describe('getEntitiesData()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelPreview: {
        gameState: [
          [{}, { staticEntity: { id: 1, entityId: ENTITIES.FLOOR } }, {}],
          [
            { staticEntity: { id: 2, entityId: ENTITIES.FLOOR } },
            {
              staticEntity: { id: 3, entityId: ENTITIES.FLOOR },
              movableEntity: { id: 4, entityId: ENTITIES.BLOCK, color: '#ff0000', fading: true },
            },
            { staticEntity: { id: 5, entityId: ENTITIES.FLOOR } },
          ],
          [{}, { id: 6, entityId: ENTITIES.FLOOR }, {}],
        ],
      },
    };
  });

  it('Converts the game state into raw entity data for the preview area to work with', () => {
    const entitiesData = getEntitiesData(state);

    expect(entitiesData).toEqual({
      '1': {
        entity: {
          entityId: ENTITIES.FLOOR,
          id: 1,
        },
        xPos: ((GRID_SIZE - state.levelPreview.gameState[0].length) / 2 + 1) * GRID_SIZE,
        yPos: ((GRID_SIZE - state.levelPreview.gameState.length) / 2 + 0) * GRID_SIZE,
        isMovableEntity: false,
      },
      '2': {
        entity: {
          entityId: ENTITIES.FLOOR,
          id: 2,
        },
        xPos: ((GRID_SIZE - state.levelPreview.gameState[0].length) / 2 + 0) * GRID_SIZE,
        yPos: ((GRID_SIZE - state.levelPreview.gameState.length) / 2 + 1) * GRID_SIZE,
        isMovableEntity: false,
      },
      '3': {
        entity: {
          entityId: ENTITIES.FLOOR,
          id: 3,
        },
        xPos: ((GRID_SIZE - state.levelPreview.gameState[0].length) / 2 + 1) * GRID_SIZE,
        yPos: ((GRID_SIZE - state.levelPreview.gameState.length) / 2 + 1) * GRID_SIZE,
        isMovableEntity: false,
      },
      '4': {
        entity: {
          entityId: ENTITIES.BLOCK,
          color: '#ff0000',
          fading: true,
          id: 4,
        },
        xPos: ((GRID_SIZE - state.levelPreview.gameState[0].length) / 2 + 1) * GRID_SIZE,
        yPos: ((GRID_SIZE - state.levelPreview.gameState.length) / 2 + 1) * GRID_SIZE,
        isMovableEntity: true,
      },
      '5': {
        entity: {
          entityId: ENTITIES.FLOOR,
          id: 5,
        },
        xPos: ((GRID_SIZE - state.levelPreview.gameState[0].length) / 2 + 2) * GRID_SIZE,
        yPos: ((GRID_SIZE - state.levelPreview.gameState.length) / 2 + 1) * GRID_SIZE,
        isMovableEntity: false,
      },
    });
  });
});

describe('getLevelPreviewButtonDisabledStates()', () => {
  let state;

  beforeEach(() => {
    state = {
      levelPreview: {
        moveHistory: [MOVE_UP],
        entitesMoving: false,
      },
    };
  });

  it('Enables the undo and reset buttons if entities are not moving and there is a move history of at least size 2', () => {
    const buttonDisabledStates = getLevelPreviewButtonDisabledStates(state);

    expect(buttonDisabledStates.btnRestart).toBe(false);
    expect(buttonDisabledStates.btnUndo).toBe(false);
  });

  it('Disables the undo and reset buttons if entities are moving', () => {
    const buttonDisabledStates = getLevelPreviewButtonDisabledStates({
      ...state,
      levelPreview: {
        entitiesMoving: true,
      },
    });

    expect(buttonDisabledStates.btnRestart).toBe(true);
    expect(buttonDisabledStates.btnUndo).toBe(true);
  });

  it('Disables the undo and reset buttons if there is no move history to undo', () => {
    const buttonDisabledStates = getLevelPreviewButtonDisabledStates({
      ...state,
      levelPreview: {
        moveHistory: [],
      },
    });

    expect(buttonDisabledStates.btnRestart).toBe(true);
    expect(buttonDisabledStates.btnUndo).toBe(true);
  });
});

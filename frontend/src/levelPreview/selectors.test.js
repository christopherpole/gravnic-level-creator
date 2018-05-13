import { ENTITIES } from 'gravnic-game';

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
              movableEntity: { id: 4, entityId: ENTITIES.BLOCK, fading: true },
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
        entityId: ENTITIES.FLOOR,
        xPos: ((GRID_SIZE - state.levelPreview.gameState[0].length) / 2 + 1) * GRID_SIZE,
        yPos: ((GRID_SIZE - state.levelPreview.gameState.length) / 2 + 0) * GRID_SIZE,
        isMovableEntity: false,
      },
      '2': {
        entityId: ENTITIES.FLOOR,
        xPos: ((GRID_SIZE - state.levelPreview.gameState[0].length) / 2 + 0) * GRID_SIZE,
        yPos: ((GRID_SIZE - state.levelPreview.gameState.length) / 2 + 1) * GRID_SIZE,
        isMovableEntity: false,
      },
      '3': {
        entityId: ENTITIES.FLOOR,
        xPos: ((GRID_SIZE - state.levelPreview.gameState[0].length) / 2 + 1) * GRID_SIZE,
        yPos: ((GRID_SIZE - state.levelPreview.gameState.length) / 2 + 1) * GRID_SIZE,
        isMovableEntity: false,
      },
      '4': {
        entityId: ENTITIES.BLOCK,
        xPos: ((GRID_SIZE - state.levelPreview.gameState[0].length) / 2 + 1) * GRID_SIZE,
        yPos: ((GRID_SIZE - state.levelPreview.gameState.length) / 2 + 1) * GRID_SIZE,
        fading: true,
        isMovableEntity: true,
      },
      '5': {
        entityId: ENTITIES.FLOOR,
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
        gameHistory: [{}, {}],
        entitesMoving: false,
      },
    };
  });

  it('Enables the undo and reset buttons if entities are not moving and there is a game history of at least size 2', () => {
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

  it('Disables the undo and reset buttons if there is no game history to undo', () => {
    const buttonDisabledStates = getLevelPreviewButtonDisabledStates({
      ...state,
      levelPreview: {
        gameHistory: [{}],
      },
    });

    expect(buttonDisabledStates.btnRestart).toBe(true);
    expect(buttonDisabledStates.btnUndo).toBe(true);
  });
});

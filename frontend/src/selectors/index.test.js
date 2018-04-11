import {
  getLevelManagerButtonDisabledStates,
  getSortedLevels,
  getHighestPositionValue,
  getEntitiesData,
} from './index';
import testLevels from '../data/testLevels';
import { GRID_SIZE } from '../config/settings';

describe.only('The selectors', () => {
  describe('getLevelManagerButtonDisabledStates()', () => {
    let state;

    beforeEach(() => {
      state = {
        levelEditor: {},
        levelManager: {
          levels: [],
        },
      };
    });

    it('Returns an object with a key/value pair for each level manager button', () => {
      const buttonDisabledStates = getLevelManagerButtonDisabledStates(state);

      expect(typeof buttonDisabledStates).toBe('object');
      expect(typeof buttonDisabledStates.btnNew).toBe('boolean');
      expect(typeof buttonDisabledStates.btnLoad).toBe('boolean');
      expect(typeof buttonDisabledStates.btnSave).toBe('boolean');
      expect(typeof buttonDisabledStates.btnDelete).toBe('boolean');
      expect(typeof buttonDisabledStates.btnCopy).toBe('boolean');
      expect(typeof buttonDisabledStates.btnRename).toBe('boolean');
    });

    it('Computes the correct disabled state of the level manager buttons if a level has not been selected', () => {
      const buttonDisabledStates = getLevelManagerButtonDisabledStates(state);

      expect(buttonDisabledStates.btnNew).toBe(false);
      expect(buttonDisabledStates.btnLoad).toBe(true);
      expect(buttonDisabledStates.btnSave).toBe(true);
      expect(buttonDisabledStates.btnDelete).toBe(true);
      expect(buttonDisabledStates.btnCopy).toBe(true);
      expect(buttonDisabledStates.btnRename).toBe(true);
    });

    it('Computes the correct disabled state of the level manager buttons if a level has been selected', () => {
      const buttonDisabledStates = getLevelManagerButtonDisabledStates({
        ...state,
        levelManager: {
          ...state.levelManager,
          selectedLevelId: testLevels[1].id,
        },
      });

      expect(buttonDisabledStates.btnNew).toBe(false);
      expect(buttonDisabledStates.btnLoad).toBe(false);
      expect(buttonDisabledStates.btnSave).toBe(false);
      expect(buttonDisabledStates.btnDelete).toBe(false);
      expect(buttonDisabledStates.btnCopy).toBe(false);
      expect(buttonDisabledStates.btnRename).toBe(false);
    });

    it('Disables the save/load buttons if there are no changes between the editor and the currently selected level', () => {
      const buttonDisabledStates = getLevelManagerButtonDisabledStates({
        ...state,
        levelEditor: {
          ...state.levelEditor,
          tiles: testLevels[1].tiles,
          stars: testLevels[1].stars,
        },
        levelManager: {
          ...state.levelManager,
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
      });

      expect(buttonDisabledStates.btnNew).toBe(false);
      expect(buttonDisabledStates.btnLoad).toBe(true);
      expect(buttonDisabledStates.btnSave).toBe(true);
      expect(buttonDisabledStates.btnDelete).toBe(false);
      expect(buttonDisabledStates.btnCopy).toBe(false);
      expect(buttonDisabledStates.btnRename).toBe(false);
    });

    it('Will disable the save/load buttons if there are no changes between the editor and the currently selected level', () => {
      const buttonDisabledStates = getLevelManagerButtonDisabledStates({
        ...state,
        levelEditor: {
          ...state.levelEditor,
          tiles: testLevels[1].tiles,
          stars: testLevels[1].stars,
        },
        levelManager: {
          ...state.levelManager,
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
      });

      expect(buttonDisabledStates.btnNew).toBe(false);
      expect(buttonDisabledStates.btnLoad).toBe(true);
      expect(buttonDisabledStates.btnSave).toBe(true);
      expect(buttonDisabledStates.btnDelete).toBe(false);
      expect(buttonDisabledStates.btnCopy).toBe(false);
      expect(buttonDisabledStates.btnRename).toBe(false);
    });

    it("Will enable the save/load buttons if the editor's tiles are different to the currently selected level's", () => {
      const buttonDisabledStates = getLevelManagerButtonDisabledStates({
        ...state,
        levelEditor: {
          ...state.levelEditor,
          tiles: [testLevels[1].tiles[0] + 1, ...testLevels[1].tiles.slice(1)],
          stars: testLevels[1].stars,
        },
        levelManager: {
          ...state.levelManager,
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
      });

      expect(buttonDisabledStates.btnNew).toBe(false);
      expect(buttonDisabledStates.btnLoad).toBe(false);
      expect(buttonDisabledStates.btnSave).toBe(false);
      expect(buttonDisabledStates.btnDelete).toBe(false);
      expect(buttonDisabledStates.btnCopy).toBe(false);
      expect(buttonDisabledStates.btnRename).toBe(false);
    });

    it("Will enable the save/load buttons if the editor's stars are different to the currently selected level's", () => {
      const buttonDisabledStates = getLevelManagerButtonDisabledStates({
        ...state,
        levelEditor: {
          ...state.levelEditor,
          tiles: testLevels[1].tiles,
          stars: [testLevels[1].stars[0] + 1, ...testLevels[1].stars.slice(1)],
        },
        levelManager: {
          ...state.levelManager,
          selectedLevelId: testLevels[1].id,
          levels: testLevels,
        },
      });

      expect(buttonDisabledStates.btnNew).toBe(false);
      expect(buttonDisabledStates.btnLoad).toBe(false);
      expect(buttonDisabledStates.btnSave).toBe(false);
      expect(buttonDisabledStates.btnDelete).toBe(false);
      expect(buttonDisabledStates.btnCopy).toBe(false);
      expect(buttonDisabledStates.btnRename).toBe(false);
    });

    it('Computes the correct disabled state of the level manager buttons if a level is being renamed', () => {
      const buttonDisabledStates = getLevelManagerButtonDisabledStates({
        ...state,
        levelManager: {
          ...state.levelManager,
          selectedLevelId: testLevels[1].id,
          renamingLevelId: testLevels[1].id,
          renamingLevelName: 'New level name',
        },
      });

      expect(buttonDisabledStates.btnNew).toBe(true);
      expect(buttonDisabledStates.btnLoad).toBe(true);
      expect(buttonDisabledStates.btnSave).toBe(true);
      expect(buttonDisabledStates.btnDelete).toBe(true);
      expect(buttonDisabledStates.btnCopy).toBe(true);
      expect(buttonDisabledStates.btnRename).toBe(false);
    });
  });

  describe('getSortedLevels()', () => {
    let state;

    beforeEach(() => {
      state = {
        levelEditor: {},
        levelManager: {
          levels: testLevels,
        },
      };
    });

    it('Returns the levels sorted by their "position" property', () => {
      let sortedLevels = getSortedLevels(state);
      expect(sortedLevels).toEqual(state.levelManager.levels);

      sortedLevels = getSortedLevels({
        ...state,
        levelManager: {
          ...state.levelManager,
          levels: [{ ...testLevels[1] }, { ...testLevels[2] }, { ...testLevels[0] }],
        },
      });

      expect(sortedLevels).toEqual(state.levelManager.levels);
    });
  });

  describe('getHighestPositionValue()', () => {
    let state;

    beforeEach(() => {
      state = {
        levelEditor: {},
        levelManager: {
          levels: [
            { ...testLevels[0], position: 1 },
            { ...testLevels[1], position: 5 },
            { ...testLevels[2], position: 3 },
          ],
        },
      };
    });

    it('Returns "0" if there are no levels', () => {
      const highestPosition = getHighestPositionValue({
        ...state,
        levelManager: {
          ...state.levelManager,
          levels: [],
        },
      });

      expect(highestPosition).toBe(0);
    });

    it('Returns the largest "position" value for the levels in the level manager state', () => {
      const highestPosition = getHighestPositionValue(state);

      expect(highestPosition).toBe(5);
    });
  });

  describe('getEntitiesData()', () => {
    let state;

    beforeEach(() => {
      state = {
        levelPreview: {
          gameState: [
            [{}, { staticEntity: { id: 1, entityId: 1 } }, {}],
            [
              { staticEntity: { id: 2, entityId: 1 } },
              {
                staticEntity: { id: 3, entityId: 1 },
                movableEntity: { id: 4, entityId: 2, fading: true },
              },
              { staticEntity: { id: 5, entityId: 1 } },
            ],
            [{}, { id: 6, entityId: 1 }, {}],
          ],
        },
      };
    });

    it('Converts the game state into raw entity data for the preview area to work with', () => {
      const entitiesData = getEntitiesData(state);
      expect(entitiesData).toEqual({
        '1': { entityId: 1, xPos: GRID_SIZE * 1, yPos: 0 },
        '2': { entityId: 1, xPos: 0, yPos: GRID_SIZE * 1 },
        '3': { entityId: 1, xPos: GRID_SIZE * 1, yPos: GRID_SIZE * 1 },
        '4': { entityId: 2, xPos: GRID_SIZE * 1, yPos: GRID_SIZE * 1, fading: true },
        '5': { entityId: 1, xPos: GRID_SIZE * 2, yPos: GRID_SIZE * 1 },
      });
    });
  });
});

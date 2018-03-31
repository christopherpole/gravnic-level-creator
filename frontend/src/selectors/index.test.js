import { getLevelManagerButtonDisabledStates } from './index';
import testLevels from '../data/testLevels';

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
});

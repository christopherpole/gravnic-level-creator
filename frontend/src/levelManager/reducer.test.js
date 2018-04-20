import {
  RETRIEVE_LEVELS,
  CREATE_LEVEL,
  UPDATE_LEVEL,
  UPDATE_LEVELS,
  DELETE_LEVEL,
} from 'api/actions';
import testLevels from 'data/testLevels';
import { createNewLevel } from 'utils';
import reducer, { initialState as levelManagerInitialState } from './reducer';
import {
  SELECT_LEVEL,
  CREATE_NEW_LEVEL,
  LOAD_LEVEL,
  LOAD_LEVEL_CONFIRMED,
  SAVE_LEVEL,
  DELETE_SELECTED_LEVEL,
  DELETE_SELECTED_LEVEL_CONFIRMED,
  COPY_LEVEL,
  BEGIN_RENAME_LEVEL,
  CHANGE_RENAME_LEVEL,
  FINISH_RENAME_LEVEL,
  REORDER_LEVELS,
  SHOW_CONFIRMATION_SCREEN,
  CANCEL_CONFIRMATION,
  CONFIRM_CONFIRMATION,
} from './actions';

describe('The level manager reducer', () => {
  it('Returns the initial state', () => {
    expect(reducer(undefined, [])).toEqual(levelManagerInitialState);
  });

  describe('SELECT_LEVEL', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
          },
          {
            type: SELECT_LEVEL,
            id: testLevels[1].id,
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        selectedLevelId: testLevels[1].id,
      });
    });
  });

  describe('RETRIEVE_LEVELS.PENDING', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(undefined, {
          type: RETRIEVE_LEVELS.PENDING,
        }),
      ).toEqual({
        ...levelManagerInitialState,
        loading: true,
      });
    });
  });

  describe('RETRIEVE_LEVELS.FULFILLED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(undefined, {
          type: RETRIEVE_LEVELS.FULFILLED,
          payload: {
            levels: testLevels,
          },
        }),
      ).toEqual({
        ...levelManagerInitialState,
        loading: false,
        loaded: true,
        error: false,
        levels: testLevels,
      });
    });
  });

  describe('RETRIEVE_LEVELS.REJECTED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(undefined, {
          type: RETRIEVE_LEVELS.REJECTED,
          payload: {
            error: new Error('Test error'),
          },
        }),
      ).toEqual({
        ...levelManagerInitialState,
        loading: false,
        loaded: false,
        error: true,
      });
    });
  });

  describe('CREATE_NEW_LEVEL', () => {
    it('Handles the action correctly', () => {
      const newLevel = createNewLevel();

      expect(
        reducer(
          {
            ...levelManagerInitialState,
            levels: testLevels,
          },
          {
            type: CREATE_NEW_LEVEL,
            level: newLevel,
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        levels: [...testLevels, newLevel],
        selectedLevelId: newLevel.id,
        renamingLevelId: newLevel.id,
        renamingLevelName: newLevel.name,
      });
    });
  });

  describe('COPY_LEVEL', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            levels: testLevels,
          },
          {
            type: COPY_LEVEL,
            level: { ...testLevels[1], id: '1337' },
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        selectedLevelId: '1337',
        renamingLevelId: '1337',
        renamingLevelName: testLevels[1].name,
        levels: [...testLevels, { ...testLevels[1], id: '1337' }],
      });
    });
  });

  describe('CREATE_LEVEL.FULFILLED', () => {
    const newLevel = createNewLevel();

    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            levels: testLevels,
            selectedLevelId: testLevels[1].id,
            currentLevelId: testLevels[1].id,
            renamingLevelId: testLevels[1].id,
          },
          {
            type: CREATE_LEVEL.FULFILLED,
            payload: {
              oldLevel: testLevels[1],
              newLevel,
            },
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        levels: [...testLevels.slice(0, 1), newLevel, ...testLevels.slice(2)],
        selectedLevelId: newLevel.id,
        currentLevelId: newLevel.id,
        renamingLevelId: newLevel.id,
      });
    });

    it('Handles the action correctly if the current level is not the level being created', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            levels: testLevels,
            selectedLevelId: testLevels[0].id,
            currentLevelId: testLevels[0].id,
            renamingLevelId: testLevels[0].id,
          },
          {
            type: CREATE_LEVEL.FULFILLED,
            payload: {
              oldLevel: testLevels[1],
              newLevel,
            },
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        levels: [...testLevels.slice(0, 1), newLevel, ...testLevels.slice(2)],
        selectedLevelId: testLevels[0].id,
        currentLevelId: testLevels[0].id,
        renamingLevelId: testLevels[0].id,
      });
    });
  });

  describe('CREATE_LEVEL.REJECTED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            loaded: true,
          },
          {
            type: CREATE_LEVEL.REJECTED,
            payload: {
              error: new Error('Test error'),
            },
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        error: true,
        loaded: false,
      });
    });
  });

  describe('UPDATE_LEVEL.FULFILLED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            levels: testLevels,
          },
          {
            type: UPDATE_LEVEL.FULFILLED,
            payload: {
              level: { ...testLevels[1], name: 'New name' },
            },
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        levels: [testLevels[0], { ...testLevels[1], name: 'New name' }, ...testLevels.slice(2)],
      });
    });
  });

  describe('UPDATE_LEVELS.FULFILLED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            levels: testLevels,
          },
          {
            type: UPDATE_LEVELS.FULFILLED,
            payload: {
              levels: [
                { ...testLevels[0], name: 'New name 1' },
                { ...testLevels[2], name: 'New name 3' },
              ],
            },
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        levels: [
          { ...testLevels[0], name: 'New name 1' },
          testLevels[1],
          { ...testLevels[2], name: 'New name 3' },
          ...testLevels.slice(3),
        ],
      });
    });
  });

  describe('LOAD_LEVEL', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(undefined, {
          type: LOAD_LEVEL,
          message: 'Are you sure?',
        }),
      ).toEqual({
        ...levelManagerInitialState,
        confirmationMessage: 'Are you sure?',
      });
    });
  });

  describe('LOAD_LEVEL_CONFIRMED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(undefined, {
          type: LOAD_LEVEL_CONFIRMED,
          level: testLevels[1],
        }),
      ).toEqual({
        ...levelManagerInitialState,
        currentLevelId: testLevels[1].id,
      });
    });
  });

  describe('UPDATE_LEVEL.REJECTED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            loaded: true,
          },
          {
            type: UPDATE_LEVEL.REJECTED,
            payload: {
              error: 'Test error',
            },
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        error: true,
        loaded: false,
      });
    });
  });

  describe('UPDATE_LEVELS.REJECTED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            loaded: true,
          },
          {
            type: UPDATE_LEVELS.REJECTED,
            payload: {
              error: 'Test error',
            },
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        error: true,
        loaded: false,
      });
    });
  });

  describe('SAVE_LEVEL', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            selectedLevelId: testLevels[1].id,
            levels: testLevels,
          },
          {
            type: SAVE_LEVEL,
            level: { ...testLevels[1], tiles: [10, 11, 12] },
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        selectedLevelId: testLevels[1].id,
        levels: [
          ...testLevels.slice(0, 1),
          { ...testLevels[1], tiles: [10, 11, 12] },
          ...testLevels.slice(2),
        ],
      });
    });
  });

  describe('DELETE_SELECTED_LEVEL', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
          },
          {
            type: DELETE_SELECTED_LEVEL,
            message: 'Are you sure?',
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        confirmationMessage: 'Are you sure?',
      });
    });
  });

  describe('DELETE_SELECTED_LEVEL_CONFIRMED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            selectedLevelId: testLevels[1].id,
            currentLevelId: testLevels[1].id,
            levels: testLevels,
          },
          {
            type: DELETE_SELECTED_LEVEL_CONFIRMED,
            id: testLevels[1].id,
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        selectedLevelId: null,
        currentLevelId: null,
        levels: [...testLevels.slice(0, 1), ...testLevels.slice(2)],
      });
    });
  });

  describe('DELETE_LEVEL.REJECTED', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            loaded: true,
          },
          {
            type: DELETE_LEVEL.REJECTED,
            payload: {
              error: 'Test error',
            },
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        error: true,
        loaded: false,
      });
    });
  });

  describe('BEGIN_RENAME_LEVEL', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            levels: testLevels,
            selectedLevelId: testLevels[1].id,
          },
          {
            type: BEGIN_RENAME_LEVEL,
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        levels: testLevels,
        selectedLevelId: testLevels[1].id,
        renamingLevelId: testLevels[1].id,
        renamingLevelName: testLevels[1].name,
      });
    });
  });

  describe('CHANGE_RENAME_LEVEL', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
          },
          {
            type: CHANGE_RENAME_LEVEL,
            name: 'New level name',
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        renamingLevelName: 'New level name',
      });
    });
  });

  describe('FINISH_RENAME_LEVEL', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            levels: testLevels,
            renamingLevelId: testLevels[1].id,
            renamingLevelName: 'New level name',
          },
          {
            type: FINISH_RENAME_LEVEL,
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        levels: [
          ...testLevels.slice(0, 1),
          { ...testLevels[1], name: 'New level name' },
          ...testLevels.slice(2),
        ],
        renamingLevelId: null,
        renamingLevelName: null,
      });
    });
  });

  describe('REORDER_LEVELS', () => {
    it('Handles the action correctly', () => {
      const reorderedLevels = [
        { ...testLevels[2], position: 1 },
        { ...testLevels[1], position: 2 },
        { ...testLevels[0], position: 3 },
      ];

      expect(
        reducer(
          {
            ...levelManagerInitialState,
            levels: testLevels,
          },
          {
            type: REORDER_LEVELS,
            levels: reorderedLevels,
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        levels: reorderedLevels,
      });
    });
  });

  describe('SHOW_CONFIRMATION_SCREEN', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
          },
          {
            type: SHOW_CONFIRMATION_SCREEN,
            message: 'Are you sure?',
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        confirmationMessage: 'Are you sure?',
      });
    });
  });

  describe('CANCEL_CONFIRMATION', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            confirmationMessage: 'Are you sure?',
          },
          {
            type: CANCEL_CONFIRMATION,
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        confirmationMessage: null,
      });
    });
  });

  describe('CONFIRM_CONFIRMATION', () => {
    it('Handles the action correctly', () => {
      expect(
        reducer(
          {
            ...levelManagerInitialState,
            confirmationMessage: 'Are you sure?',
          },
          {
            type: CONFIRM_CONFIRMATION,
          },
        ),
      ).toEqual({
        ...levelManagerInitialState,
        confirmationMessage: null,
      });
    });
  });
});

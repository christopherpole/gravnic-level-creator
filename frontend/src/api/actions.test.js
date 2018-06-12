import testLevels from 'data/testLevels';

import {
  createRequestTypes,
  createRequestActions,
  RETRIEVE_LEVELS,
  CREATE_LEVEL,
  UPDATE_LEVEL,
  UPDATE_LEVELS,
  DELETE_LEVEL,
  FIND_QUICKEST_SOLUTION,
  retrieveLevels,
  createLevel,
  updateLevel,
  updateLevels,
  deleteLevel,
  findQuickestSolution,
} from './actions';

describe('The API actions', () => {
  describe('createRequestTypes()', () => {
    it('Creates the PENDING, FULFILLED and REJECTED actions', () => {
      const testActions = createRequestTypes('TEST');

      expect(typeof testActions).toBe('object');
      expect(testActions.PENDING).toBe('TEST_PENDING');
      expect(testActions.FULFILLED).toBe('TEST_FULFILLED');
      expect(testActions.REJECTED).toBe('TEST_REJECTED');
    });
  });

  describe('createRequestActions()', () => {
    it('Creates the pending, fulfilled and rejected actions', () => {
      const testActions = createRequestTypes('TEST');
      const testActionsFunctions = createRequestActions(testActions);

      expect(typeof testActionsFunctions).toBe('object');
      expect(testActionsFunctions.pending()).toEqual({
        type: 'TEST_PENDING',
        payload: undefined,
      });
      expect(testActionsFunctions.fulfilled({ levels: [] })).toEqual({
        type: 'TEST_FULFILLED',
        payload: { levels: [] },
      });
      expect(testActionsFunctions.rejected({ error: 'Test error' })).toEqual({
        type: 'TEST_REJECTED',
        payload: { error: 'Test error' },
      });
    });
  });

  describe('retrieveLevels.pending()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: RETRIEVE_LEVELS.PENDING,
      };

      expect(retrieveLevels.pending()).toEqual(expectedAction);
    });
  });

  describe('retrieveLevels.fulfilled()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: RETRIEVE_LEVELS.FULFILLED,
        payload: {
          levels: testLevels,
        },
      };

      expect(retrieveLevels.fulfilled({ levels: testLevels })).toEqual(expectedAction);
    });
  });

  describe('retrieveLevels.rejected()', () => {
    it('Creates the correct action', () => {
      const testError = new Error('Test error');

      const expectedAction = {
        type: RETRIEVE_LEVELS.REJECTED,
        payload: {
          error: testError,
        },
      };

      expect(retrieveLevels.rejected({ error: testError })).toEqual(expectedAction);
    });
  });

  describe('createLevel.pending()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: CREATE_LEVEL.PENDING,
      };

      expect(createLevel.pending()).toEqual(expectedAction);
    });
  });

  describe('createLevel.fulfilled()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: CREATE_LEVEL.FULFILLED,
        payload: {
          oldLevel: testLevels[1],
          newLevel: { ...testLevels[1], name: 'New level name' },
        },
      };

      expect(
        createLevel.fulfilled({
          oldLevel: testLevels[1],
          newLevel: { ...testLevels[1], name: 'New level name' },
        }),
      ).toEqual(expectedAction);
    });
  });

  describe('createLevel.rejected()', () => {
    it('Creates the correct action', () => {
      const testError = new Error('Test error');
      const expectedAction = {
        type: CREATE_LEVEL.REJECTED,
        payload: {
          error: testError,
        },
      };

      expect(createLevel.rejected({ error: testError })).toEqual(expectedAction);
    });
  });

  describe('updateLevel.pending()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: UPDATE_LEVEL.PENDING,
      };

      expect(updateLevel.pending()).toEqual(expectedAction);
    });
  });

  describe('updateLevel.fulfilled()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: UPDATE_LEVEL.FULFILLED,
        payload: {
          level: { ...testLevels[1], name: 'New level name' },
        },
      };

      expect(
        updateLevel.fulfilled({ level: { ...testLevels[1], name: 'New level name' } }),
      ).toEqual(expectedAction);
    });
  });

  describe('updateLevel.rejected()', () => {
    it('Creates the correct action', () => {
      const testError = new Error('Test error');
      const expectedAction = {
        type: UPDATE_LEVEL.REJECTED,
        payload: {
          error: testError,
        },
      };

      expect(updateLevel.rejected({ error: testError })).toEqual(expectedAction);
    });
  });

  describe('updateLevels.pending()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: UPDATE_LEVELS.PENDING,
      };

      expect(updateLevels.pending()).toEqual(expectedAction);
    });
  });

  describe('updateLevels.fulfilled()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: UPDATE_LEVELS.FULFILLED,
        payload: {
          levels: testLevels,
        },
      };

      expect(updateLevels.fulfilled({ levels: testLevels })).toEqual(expectedAction);
    });
  });

  describe('updateLevels.rejected()', () => {
    it('Creates the correct action', () => {
      const testError = new Error('Test error');
      const expectedAction = {
        type: UPDATE_LEVELS.REJECTED,
        payload: {
          error: testError,
        },
      };

      expect(updateLevels.rejected({ error: testError })).toEqual(expectedAction);
    });
  });

  describe('deleteLevel.pending()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: DELETE_LEVEL.PENDING,
      };

      expect(deleteLevel.pending()).toEqual(expectedAction);
    });
  });

  describe('deleteLevel.fulfilled()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: DELETE_LEVEL.FULFILLED,
        payload: {
          level: testLevels[1],
        },
      };

      expect(deleteLevel.fulfilled({ level: testLevels[1] })).toEqual(expectedAction);
    });
  });

  describe('deleteLevel.rejected()', () => {
    it('Creates the correct action', () => {
      const testError = new Error('Test error');
      const expectedAction = {
        type: DELETE_LEVEL.REJECTED,
        payload: {
          error: testError,
        },
      };

      expect(deleteLevel.rejected({ error: testError })).toEqual(expectedAction);
    });
  });

  describe('findQuickestSolution.pending()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: FIND_QUICKEST_SOLUTION.PENDING,
      };

      expect(findQuickestSolution.pending()).toEqual(expectedAction);
    });
  });

  describe('findQuickestSolution.fulfilled()', () => {
    it('Creates the correct action', () => {
      const expectedAction = {
        type: FIND_QUICKEST_SOLUTION.FULFILLED,
        payload: {
          solution: ['UP'],
        },
      };

      expect(findQuickestSolution.fulfilled({ solution: ['UP'] })).toEqual(expectedAction);
    });
  });

  describe('findQuickestSolution.rejected()', () => {
    it('Creates the correct action', () => {
      const testError = new Error('Test error');
      const expectedAction = {
        type: FIND_QUICKEST_SOLUTION.REJECTED,
        payload: {
          error: testError,
        },
      };

      expect(findQuickestSolution.rejected({ error: testError })).toEqual(expectedAction);
    });
  });
});

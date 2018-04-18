import testLevels from '../data/testLevels';

import {
  createRequestTypes,
  createRequestActions,
  RETRIEVE_LEVELS,
  CREATE_LEVEL,
  UPDATE_LEVEL,
  UPDATE_LEVELS,
  DELETE_LEVEL,
  retrieveLevels,
  createLevel,
  updateLevel,
  updateLevels,
  deleteLevel,
} from './api';

describe('The API actions', () => {
  describe('createRequestTypes()', () => {
    it('Create the PENDING, FULFILLED and REJECTED actions', () => {
      const testActions = createRequestTypes('TEST');

      expect(typeof testActions).toBe('object');
      expect(testActions.PENDING).toBe('TEST_PENDING');
      expect(testActions.FULFILLED).toBe('TEST_FULFILLED');
      expect(testActions.REJECTED).toBe('TEST_REJECTED');
    });
  });

  describe('createRequestActions()', () => {
    it('Create the pending, fulfilled and rejected actions', () => {
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

  describe('The retrieve levels actions', () => {
    it('Should create an action for when the API request starts', () => {
      const expectedAction = {
        type: RETRIEVE_LEVELS.PENDING,
      };

      expect(retrieveLevels.pending()).toEqual(expectedAction);
    });

    it('Should create an action for when the API request succeeds', () => {
      const expectedAction = {
        type: RETRIEVE_LEVELS.FULFILLED,
        payload: {
          levels: testLevels,
        },
      };

      expect(retrieveLevels.fulfilled({ levels: testLevels })).toEqual(expectedAction);
    });

    it('Should create an action for when the API request fails', () => {
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

  describe('The create level actions', () => {
    it('Should create an action for when the API request starts', () => {
      const expectedAction = {
        type: CREATE_LEVEL.PENDING,
      };

      expect(createLevel.pending()).toEqual(expectedAction);
    });

    it('Should create an action for when the API request succeeds', () => {
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

    it('Should create an action for when the API request fails', () => {
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

  describe('The update level actions', () => {
    it('Should create an action for when the API request starts', () => {
      const expectedAction = {
        type: UPDATE_LEVEL.PENDING,
      };

      expect(updateLevel.pending()).toEqual(expectedAction);
    });

    it('Should create an action for when the API request succeeds', () => {
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

    it('Should create an action for when the API request fails', () => {
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

  describe('The update levels actions', () => {
    it('Should create an action for when the API request starts', () => {
      const expectedAction = {
        type: UPDATE_LEVELS.PENDING,
      };

      expect(updateLevels.pending()).toEqual(expectedAction);
    });

    it('Should create an action for when the API request succeeds', () => {
      const expectedAction = {
        type: UPDATE_LEVELS.FULFILLED,
        payload: {
          levels: testLevels,
        },
      };

      expect(updateLevels.fulfilled({ levels: testLevels })).toEqual(expectedAction);
    });

    it('Should create an action for when the API request fails', () => {
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

  describe('The delete level actions', () => {
    it('Should create an action for when the API request starts', () => {
      const expectedAction = {
        type: DELETE_LEVEL.PENDING,
      };

      expect(deleteLevel.pending()).toEqual(expectedAction);
    });

    it('Should create an action for when the API request succeeds', () => {
      const expectedAction = {
        type: DELETE_LEVEL.FULFILLED,
        payload: {
          level: testLevels[1],
        },
      };

      expect(deleteLevel.fulfilled({ level: testLevels[1] })).toEqual(expectedAction);
    });

    it('Should create an action for when the API request fails', () => {
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
});

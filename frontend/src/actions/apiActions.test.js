import testLevels from '../data/testLevels';

import {
  RETRIEVE_LEVELS_PENDING,
  RETRIEVE_LEVELS_FULFILLED,
  RETRIEVE_LEVELS_REJECTED,
  CREATE_LEVEL_PENDING,
  CREATE_LEVEL_FULFILLED,
  CREATE_LEVEL_REJECTED,
  UPDATE_LEVEL_PENDING,
  UPDATE_LEVEL_FULFILLED,
  UPDATE_LEVEL_REJECTED,
  DELETE_LEVEL_PENDING,
  DELETE_LEVEL_FULFILLED,
  DELETE_LEVEL_REJECTED,
  retrieveLevelsPending,
  retrieveLevelsFulfilled,
  retrieveLevelsRejected,
  createLevelPending,
  createLevelFulfilled,
  createLevelRejected,
  updateLevelPending,
  updateLevelFulfilled,
  updateLevelRejected,
  deleteLevelPending,
  deleteLevelFulfilled,
  deleteLevelRejected,
} from './apiActions';

describe('The API actions', () => {
  describe('The retrieve levels actions', () => {
    it('Should create an action for when the API request starts', () => {
      const expectedAction = {
        type: RETRIEVE_LEVELS_PENDING,
      };

      expect(retrieveLevelsPending()).toEqual(expectedAction);
    });

    it('Should create an action for when the API request succeeds', () => {
      const expectedAction = {
        type: RETRIEVE_LEVELS_FULFILLED,
        levels: testLevels,
      };

      expect(retrieveLevelsFulfilled(testLevels)).toEqual(expectedAction);
    });

    it('Should create an action for when the API request fails', () => {
      const testError = new Error('Test error');
      const expectedAction = {
        type: RETRIEVE_LEVELS_REJECTED,
        error: testError,
      };

      expect(retrieveLevelsRejected(testError)).toEqual(expectedAction);
    });
  });

  describe('The create level actions', () => {
    it('Should create an action for when the API request starts', () => {
      const expectedAction = {
        type: CREATE_LEVEL_PENDING,
      };

      expect(createLevelPending()).toEqual(expectedAction);
    });

    it('Should create an action for when the API request succeeds', () => {
      const expectedAction = {
        type: CREATE_LEVEL_FULFILLED,
        oldLevel: testLevels[1],
        newLevel: { ...testLevels[1], name: 'New level name' },
      };

      expect(
        createLevelFulfilled(testLevels[1], { ...testLevels[1], name: 'New level name' }),
      ).toEqual(expectedAction);
    });

    it('Should create an action for when the API request fails', () => {
      const testError = new Error('Test error');
      const expectedAction = {
        type: CREATE_LEVEL_REJECTED,
        error: testError,
      };

      expect(createLevelRejected(testError)).toEqual(expectedAction);
    });
  });

  describe('The update level actions', () => {
    it('Should create an action for when the API request starts', () => {
      const expectedAction = {
        type: UPDATE_LEVEL_PENDING,
      };

      expect(updateLevelPending()).toEqual(expectedAction);
    });

    it('Should create an action for when the API request succeeds', () => {
      const expectedAction = {
        type: UPDATE_LEVEL_FULFILLED,
        level: { ...testLevels[1], name: 'New level name' },
      };

      expect(updateLevelFulfilled({ ...testLevels[1], name: 'New level name' })).toEqual(
        expectedAction,
      );
    });

    it('Should create an action for when the API request fails', () => {
      const testError = new Error('Test error');
      const expectedAction = {
        type: UPDATE_LEVEL_REJECTED,
        error: testError,
      };

      expect(updateLevelRejected(testError)).toEqual(expectedAction);
    });
  });

  describe('The delete level actions', () => {
    it('Should create an action for when the API request starts', () => {
      const expectedAction = {
        type: DELETE_LEVEL_PENDING,
      };

      expect(deleteLevelPending()).toEqual(expectedAction);
    });

    it('Should create an action for when the API request succeeds', () => {
      const expectedAction = {
        type: DELETE_LEVEL_FULFILLED,
        level: testLevels[1],
      };

      expect(deleteLevelFulfilled(testLevels[1])).toEqual(expectedAction);
    });

    it('Should create an action for when the API request fails', () => {
      const testError = new Error('Test error');
      const expectedAction = {
        type: DELETE_LEVEL_REJECTED,
        error: testError,
      };

      expect(deleteLevelRejected(testError)).toEqual(expectedAction);
    });
  });
});

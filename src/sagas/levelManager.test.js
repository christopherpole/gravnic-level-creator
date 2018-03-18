import { put, call, select } from 'redux-saga/effects';

import {
  fetchLevels as apiFetchLevels,
  createLevel as apiCreateLevel,
  deleteLevel as apiDeleteLevel,
} from '../api/levelManager';
import { retrieveLevelsSaga, createLevelSaga, deleteLevelSaga } from './levelManager';
import {
  retrieveLevels,
  retrieveLevelsPending,
  retrieveLevelsFulfilled,
  retrieveLevelsRejected,
  createLevel,
  createLevelPending,
  createLevelFulfilled,
  createLevelRejected,
  deleteLevel,
  deleteLevelPending,
  deleteLevelFulfilled,
  deleteLevelRejected,
} from '../actions/levelManager';
import testLevels from '../data/testLevels';

describe('The level manager sagas', () => {
  describe('The retrieve levels saga', () => {
    it('Should retrieve levels successfully', () => {
      const generator = retrieveLevelsSaga(retrieveLevels());

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsPending));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiFetchLevels));

      //  Fire the fulfilled action
      step = generator.next(testLevels);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsFulfilled(testLevels)));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });

    it('Should handle failure to retrieve levels', () => {
      const generator = retrieveLevelsSaga(retrieveLevels());

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsPending));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiFetchLevels));

      //  Fire the rejected action
      step = generator.throw('Test error');
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsRejected('Test error')));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('The create level saga', () => {
    it('Should create a level successfully', () => {
      const generator = createLevelSaga(createLevel());

      //  Fire the pending action
      let step = generator.next();
      const newLevel = step.value.PUT.action.level;
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevelPending(newLevel)));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiCreateLevel, newLevel));

      //  Fire the fulfilled action
      step = generator.next({ ...newLevel, id: '1337' });
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevelFulfilled(newLevel, { ...newLevel, id: '1337' })));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });

    it('Should handle failure to create a level', () => {
      const generator = createLevelSaga(createLevel());

      //  Fire the pending action
      let step = generator.next();
      const newLevel = step.value.PUT.action.level;
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevelPending(newLevel)));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiCreateLevel, newLevel));

      //  Fire the rejected action
      step = generator.throw('Test error');
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevelRejected('Test error')));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('The delete level saga', () => {
    it('Should delete a level successfully', () => {
      const generator = deleteLevelSaga(deleteLevel());
      const state = {
        levelManager: {
          levels: testLevels,
          selectedLevelId: testLevels[1].id,
        },
      };

      //  Get the currently selected level id from the state
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(select());

      //  Fire the pending action
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteLevelPending(testLevels[1].id)));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiDeleteLevel, testLevels[1].id));

      //  Fire the fulfilled action
      step = generator.next(testLevels[1]);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteLevelFulfilled(testLevels[1])));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });

    it('Should handle failure to delete a level', () => {
      const generator = deleteLevelSaga(deleteLevel());
      const state = {
        levelManager: {
          levels: testLevels,
          selectedLevelId: testLevels[1].id,
        },
      };

      //  Get the currently selected level id from the state
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(select());

      //  Fire the pending action
      step = generator.next(state);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteLevelPending(testLevels[1].id)));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiDeleteLevel, testLevels[1].id));

      //  Fire the rejected action
      const testError = new Error('Test error');
      step = generator.throw(testError);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteLevelRejected(testError)));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });
  });
});

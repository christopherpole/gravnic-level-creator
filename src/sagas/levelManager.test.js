import { put, call } from 'redux-saga/effects';

import { fetchLevels as apiFetchLevels, createLevel as apiCreateLevel } from '../api/levelManager';
import { retrieveLevelsSaga, createLevelSaga } from './levelManager';
import {
  retrieveLevels,
  retrieveLevelsPending,
  retrieveLevelsFulfilled,
  retrieveLevelsRejected,
  createLevel,
  createLevelPending,
  createLevelFulfilled,
  createLevelRejected,
} from '../actions/levelManager';
import testLevels from '../data/testLevels';

describe('The level manager sagas', () => {
  describe('retrieveLevels()', () => {
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

  describe('createLevel()', () => {
    it('Should create a level successfully', () => {
      const createLevelAction = createLevel();
      const generator = createLevelSaga(createLevelAction);

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevelPending));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiCreateLevel, createLevelAction.level));

      //  Fire the fulfilled action
      step = generator.next(testLevels[0]);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevelFulfilled(testLevels[0])));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });

    it('Should handle failure to create a level', () => {
      const createLevelAction = createLevel();
      const generator = createLevelSaga(createLevelAction);

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevelPending));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiCreateLevel, createLevelAction.level));

      //  Fire the rejected action
      step = generator.throw('Test error');
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevelRejected('Test error')));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });
  });
});

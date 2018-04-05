import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import {
  fetchLevels as apiFetchLevels,
  createLevel as apiCreateLevel,
  updateLevel as apiUpdateLevel,
  updateLevels as apiUpdateLevels,
  deleteLevel as apiDeleteLevel,
} from '../api';
import {
  retrieveLevelsSaga,
  createLevelSaga,
  updateLevelSaga,
  updateLevelsSaga,
  deleteLevelSaga,
} from './api';
import {
  retrieveLevelsPending,
  retrieveLevelsFulfilled,
  retrieveLevelsRejected,
  createLevelPending,
  createLevelFulfilled,
  createLevelRejected,
  updateLevelPending,
  updateLevelFulfilled,
  updateLevelRejected,
  updateLevelsPending,
  updateLevelsFulfilled,
  updateLevelsRejected,
  deleteLevelPending,
  deleteLevelFulfilled,
  deleteLevelRejected,
} from '../actions/api';
import testLevels from '../data/testLevels';

describe('The API sagas', () => {
  describe('The retrieve levels saga', () => {
    it('Should handle retrieving levels from the server', () => {
      const generator = cloneableGenerator(retrieveLevelsSaga)();

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsPending()));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiFetchLevels));

      //  Fire the fulfilled action
      step = generator.next(testLevels);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsFulfilled(testLevels)));

      //  Clone the generator before the pass/failure fork for later use
      const clonedGenerator = generator.clone();

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      step = clonedGenerator.throw('Test error');
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsRejected('Test error')));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('The create level saga', () => {
    it('Should create a level successfully', () => {
      const generator = cloneableGenerator(createLevelSaga)({
        level: testLevels[1],
      });

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevelPending()));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiCreateLevel, testLevels[1]));

      //  Clone the generator before the pass/failure fork for later use
      const clonedGenerator = generator.clone();

      //  Fire the fulfilled action
      step = generator.next({ ...testLevels[1], id: '1337' });
      expect(step.done).toBe(false);
      expect(step.value).toEqual(
        put(createLevelFulfilled(testLevels[1], { ...testLevels[1], id: '1337' })),
      );

      // Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      step = clonedGenerator.throw('Test error');
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevelRejected('Test error')));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('The update level saga', () => {
    it('Should update a level successfully', () => {
      const generator = cloneableGenerator(updateLevelSaga)({
        level: testLevels[1],
      });

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateLevelPending()));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiUpdateLevel, testLevels[1]));

      //  Clone the generator before the pass/failure fork for later use
      const clonedGenerator = generator.clone();

      //  Fire the fulfilled action
      step = generator.next(testLevels[2]);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateLevelFulfilled(testLevels[2])));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      const testError = new Error('Test error');
      step = clonedGenerator.throw(testError);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateLevelRejected(testError)));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('The update levels saga', () => {
    it('Should update levels successfully', () => {
      const generator = cloneableGenerator(updateLevelsSaga)({
        levels: testLevels,
      });

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateLevelsPending()));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiUpdateLevels, testLevels));

      //  Clone the generator before the pass/failure fork for later use
      const clonedGenerator = generator.clone();

      //  Fire the fulfilled action
      step = generator.next([{ ...testLevels[0], name: 'New name' }, ...testLevels.slice(1)]);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(
        put(
          updateLevelsFulfilled([{ ...testLevels[0], name: 'New name' }, ...testLevels.slice(1)]),
        ),
      );

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      const testError = new Error('Test error');
      step = clonedGenerator.throw(testError);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateLevelsRejected(testError)));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('The delete level saga', () => {
    it('Should delete a level successfully', () => {
      const generator = cloneableGenerator(deleteLevelSaga)({
        id: testLevels[1].id,
      });

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteLevelPending()));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiDeleteLevel, testLevels[1].id));

      //  Clone the generator before the pass/failure fork for later use
      const clonedGenerator = generator.clone();

      //  Fire the fulfilled action
      step = generator.next(testLevels[1]);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteLevelFulfilled(testLevels[1])));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      const testError = new Error('Test error');
      step = clonedGenerator.throw(testError);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteLevelRejected(testError)));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });
});

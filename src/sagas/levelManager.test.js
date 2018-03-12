import { put, call } from 'redux-saga/effects';

import { fetchLevels } from '../api/levelManager';
import { retrieveLevels } from './levelManager';
import {
  retrieveLevelsPending,
  retrieveLevelsFulfilled,
  retrieveLevelsRejected,
} from '../actions/levelManager';

describe('The level manager sagas', () => {
  const testLevels = [
    {
      id: '1',
      name: 'Test level',
      tiles: [1, 2, 3],
    },
  ];

  describe('retrieveLevels()', () => {
    it('Should retrieving levels successfully', () => {
      const generator = retrieveLevels();

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsPending));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(fetchLevels));

      //  Fire the fulfilled action
      step = generator.next(testLevels);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsFulfilled(testLevels)));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });

    it('Should handle failure to retrieve levels', () => {
      const generator = retrieveLevels();

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsPending));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(fetchLevels));

      //  Fire the rejected action
      step = generator.throw('Test error');
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevelsRejected('Test error')));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);
    });
  });
});

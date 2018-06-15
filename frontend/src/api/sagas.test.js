import { MOVE_UP } from 'gravnic-game';
import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import testLevels from 'data/testLevels';
import {
  fetchLevels as apiFetchLevels,
  createLevel as apiCreateLevel,
  updateLevel as apiUpdateLevel,
  updateLevels as apiUpdateLevels,
  deleteLevel as apiDeleteLevel,
  findQuickestSolution as apiFindQuickestSolution,
} from 'api';
import {
  retrieveLevelsSaga,
  createLevelSaga,
  updateLevelSaga,
  updateLevelsSaga,
  deleteLevelSaga,
  findQuickestSolutionSaga,
} from './sagas';
import {
  retrieveLevels,
  createLevel,
  updateLevel,
  updateLevels,
  deleteLevel,
  findQuickestSolution,
} from './actions';

describe('The API sagas', () => {
  describe('retrieveLevelsSaga()', () => {
    it('Handles the retrieval of levels from the server', () => {
      const generator = cloneableGenerator(retrieveLevelsSaga)();

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevels.pending()));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiFetchLevels));

      //  Fire the fulfilled action
      step = generator.next(testLevels);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevels.fulfilled({ levels: testLevels })));

      //  Clone the generator before the pass/failure fork for later use
      const clonedGenerator = generator.clone();

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      step = clonedGenerator.throw('Test error');
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(retrieveLevels.rejected({ error: 'Test error' })));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('createLevelSaga()', () => {
    it('Handles the creation of levels from the server', () => {
      const generator = cloneableGenerator(createLevelSaga)({
        level: testLevels[1],
      });

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevel.pending()));

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
        put(
          createLevel.fulfilled({
            oldLevel: testLevels[1],
            newLevel: { ...testLevels[1], id: '1337' },
          }),
        ),
      );

      // Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      step = clonedGenerator.throw('Test error');
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(createLevel.rejected({ error: 'Test error' })));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('updateLevelSaga()', () => {
    it('Handles the updating of a level from the server', () => {
      const generator = cloneableGenerator(updateLevelSaga)({
        level: testLevels[1],
      });

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateLevel.pending()));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiUpdateLevel, testLevels[1]));

      //  Clone the generator before the pass/failure fork for later use
      const clonedGenerator = generator.clone();

      //  Fire the fulfilled action
      step = generator.next(testLevels[2]);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateLevel.fulfilled({ level: testLevels[2] })));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      const testError = new Error('Test error');
      step = clonedGenerator.throw(testError);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateLevel.rejected({ error: testError })));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('updateLevelsSaga()', () => {
    it('Handles the updating of levels from the server', () => {
      const generator = cloneableGenerator(updateLevelsSaga)({
        levels: testLevels,
      });

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateLevels.pending()));

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
          updateLevels.fulfilled({
            levels: [{ ...testLevels[0], name: 'New name' }, ...testLevels.slice(1)],
          }),
        ),
      );

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      const testError = new Error('Test error');
      step = clonedGenerator.throw(testError);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(updateLevels.rejected({ error: testError })));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('deleteLevelSaga()', () => {
    it('Handles the deletion of levels from the server', () => {
      const generator = cloneableGenerator(deleteLevelSaga)({
        id: testLevels[1].id,
      });

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteLevel.pending()));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiDeleteLevel, testLevels[1].id));

      //  Clone the generator before the pass/failure fork for later use
      const clonedGenerator = generator.clone();

      //  Fire the fulfilled action
      step = generator.next(testLevels[1]);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteLevel.fulfilled({ level: testLevels[1] })));

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      const testError = new Error('Test error');
      step = clonedGenerator.throw(testError);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteLevel.rejected({ error: testError })));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });

  describe('findQuickestSolution()', () => {
    it('Finds the quickest solution for the given level from the server', () => {
      const generator = cloneableGenerator(findQuickestSolutionSaga)({
        gameState: [1, 2, 3],
      });

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(findQuickestSolution.pending()));

      //  Perform the API request
      step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(call(apiFindQuickestSolution, [1, 2, 3]));

      //  Clone the generator before the pass/failure fork for later use
      const clonedGenerator = generator.clone();

      //  Fire the fulfilled action
      step = generator.next({ solved: true, solution: [MOVE_UP], maxMoves: 10 });
      expect(step.done).toBe(false);
      expect(step.value).toEqual(
        put(
          findQuickestSolution.fulfilled({
            solved: true,
            solution: [MOVE_UP],
            maxMoves: 10,
          }),
        ),
      );

      //  Finish
      step = generator.next();
      expect(step.done).toBe(true);

      //  Fire the rejected action
      const testError = new Error('Test error');
      step = clonedGenerator.throw(testError);
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(findQuickestSolution.rejected({ error: testError })));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });
});

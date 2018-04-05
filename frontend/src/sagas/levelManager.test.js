import { take, put, race } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import {
  CANCEL_CONFIRMATION,
  CONFIRM_CONFIRMATION,
  cancelConfirmation,
  confirmConfirmation,
  deleteSelectedLevelConfirmed,
} from '../actions/levelManager';
import { deleteLevelSaga } from './levelManager';
import testLevels from '../data/testLevels';

describe('The level manager sagas', () => {
  describe('The delete selected level saga', () => {
    it('Should handle retrieving levels from the server', () => {
      const generator = cloneableGenerator(deleteLevelSaga)(testLevels[1]);

      //  Fire the pending action
      let step = generator.next();
      expect(step.done).toBe(false);
      expect(step.value).toEqual(
        race({
          cancel: take(CANCEL_CONFIRMATION),
          confirm: take(CONFIRM_CONFIRMATION),
        }),
      );

      //  Clone the generator before the pass/failure fork for later use
      const clonedGenerator = generator.clone();

      //  Finish cancel action
      step = generator.next({ cancel: cancelConfirmation() });
      expect(step.done).toBe(true);

      //  Put the level deletion confirmion on confirm
      step = clonedGenerator.next({ confirm: confirmConfirmation() });
      expect(step.done).toBe(false);
      expect(step.value).toEqual(put(deleteSelectedLevelConfirmed(testLevels[1].id)));

      //  Finish
      step = clonedGenerator.next();
      expect(step.done).toBe(true);
    });
  });
});

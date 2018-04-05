import { takeLatest } from 'redux-saga';
import { put, take, race } from 'redux-saga/effects';

import {
  DELETE_SELECTED_LEVEL,
  CANCEL_CONFIRMATION,
  CONFIRM_CONFIRMATION,
  deleteSelectedLevelConfirmed,
} from '../actions/levelManager';

export function* deleteLevelSaga(action) {
  const { confirm } = yield race({
    cancel: take(CANCEL_CONFIRMATION),
    confirm: take(CONFIRM_CONFIRMATION),
  });

  if (confirm) {
    yield put(deleteSelectedLevelConfirmed(action.id));
  }
}

export default function* levelManagerSagas() {
  yield takeLatest(DELETE_SELECTED_LEVEL, deleteLevelSaga);
}

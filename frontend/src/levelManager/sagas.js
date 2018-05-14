import { takeLatest, put, take, race } from 'redux-saga/effects';

import {
  DELETE_SELECTED_LEVEL,
  LOAD_LEVEL,
  CANCEL_CONFIRMATION,
  CONFIRM_CONFIRMATION,
  deleteSelectedLevelConfirmed,
  loadLevelConfirmed,
} from './actions';

export function* deleteLevelSaga(action) {
  const { confirm } = yield race({
    cancel: take(CANCEL_CONFIRMATION),
    confirm: take(CONFIRM_CONFIRMATION),
  });

  if (confirm) {
    yield put(deleteSelectedLevelConfirmed(action.id));
  }
}

export function* loadLevelSaga(action) {
  const { confirm } = yield race({
    cancel: take(CANCEL_CONFIRMATION),
    confirm: take(CONFIRM_CONFIRMATION),
  });

  if (confirm) {
    yield put(loadLevelConfirmed(action.level));
  }
}

export default function* levelManagerSagas() {
  yield takeLatest(DELETE_SELECTED_LEVEL, deleteLevelSaga);
  yield takeLatest(LOAD_LEVEL, loadLevelSaga);
}

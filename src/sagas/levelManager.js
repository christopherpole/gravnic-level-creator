import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { fetchLevels, createLevel, deleteLevel, updateLevel } from '../api/levelManager';
import {
  RETRIEVE_LEVELS,
  CREATE_NEW_LEVEL,
  COPY_LEVEL,
  DELETE_LEVEL,
  SAVE_LEVEL,
  FINISH_RENAME_LEVEL,
} from '../actions/levelManager';
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
  deleteLevelPending,
  deleteLevelFulfilled,
  deleteLevelRejected,
} from '../actions/apiActions';

export function* retrieveLevelsSaga() {
  yield put(retrieveLevelsPending());

  try {
    const res = yield call(fetchLevels);
    yield put(retrieveLevelsFulfilled(res));
  } catch (err) {
    yield put(retrieveLevelsRejected(err));
  }
}

export function* createLevelSaga(action) {
  yield put(createLevelPending());

  try {
    const res = yield call(createLevel, action.level);
    yield put(createLevelFulfilled(action.level, res));
  } catch (err) {
    yield put(createLevelRejected(err));
  }
}

export function* updateLevelSaga(action) {
  yield put(updateLevelPending());

  try {
    const res = yield call(updateLevel, action.level);
    yield put(updateLevelFulfilled(res));
  } catch (err) {
    yield put(updateLevelRejected(err));
  }
}

export function* deleteLevelSaga(action) {
  yield put(deleteLevelPending());

  try {
    const res = yield call(deleteLevel, action.id);
    yield put(deleteLevelFulfilled(res));
  } catch (err) {
    yield put(deleteLevelRejected(err));
  }
}

export default function* levelManagerSagas() {
  yield takeLatest(RETRIEVE_LEVELS, retrieveLevelsSaga);
  yield takeLatest([CREATE_NEW_LEVEL, COPY_LEVEL], createLevelSaga);
  yield takeLatest(DELETE_LEVEL, deleteLevelSaga);
  yield takeLatest([SAVE_LEVEL, FINISH_RENAME_LEVEL], updateLevelSaga);
}

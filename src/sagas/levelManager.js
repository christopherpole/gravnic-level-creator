import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { fetchLevels, createLevel } from '../api/levelManager';
import {
  RETRIEVE_LEVELS,
  CREATE_LEVEL,
  retrieveLevelsPending,
  retrieveLevelsFulfilled,
  retrieveLevelsRejected,
  createLevelPending,
  createLevelFulfilled,
  createLevelRejected,
} from '../actions/levelManager';

export function* retrieveLevelsSaga() {
  yield put(retrieveLevelsPending);

  try {
    const res = yield call(fetchLevels);
    yield put(retrieveLevelsFulfilled(res));
  } catch (err) {
    yield put(retrieveLevelsRejected(err));
  }
}

export function* createLevelSaga(action) {
  yield put(createLevelPending);

  try {
    const res = yield call(createLevel, action.level);
    yield put(createLevelFulfilled(res));
  } catch (err) {
    yield put(createLevelRejected(err));
  }
}

export default function* levelManagerSagas() {
  yield takeLatest(RETRIEVE_LEVELS, retrieveLevelsSaga);
  yield takeLatest(CREATE_LEVEL, createLevelSaga);
}

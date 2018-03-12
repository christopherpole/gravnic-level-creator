import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { fetchLevels } from '../api/levelManager';
import {
  RETRIEVE_LEVELS,
  retrieveLevelsPending,
  retrieveLevelsFulfilled,
  retrieveLevelsRejected,
} from '../actions/levelManager';

export function* retrieveLevels() {
  yield put(retrieveLevelsPending);

  try {
    const res = yield call(fetchLevels);
    yield put(retrieveLevelsFulfilled(res));
  } catch (err) {
    yield put(retrieveLevelsRejected(err));
  }
}

export default function* levelManagerSagas() {
  yield takeLatest(RETRIEVE_LEVELS, retrieveLevels);
}

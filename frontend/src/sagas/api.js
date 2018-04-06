import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { fetchLevels, createLevel, deleteLevel, updateLevel, updateLevels } from '../api';
import {
  RETRIEVE_LEVELS,
  CREATE_NEW_LEVEL,
  COPY_LEVEL,
  DELETE_SELECTED_LEVEL_CONFIRMED,
  SAVE_LEVEL,
  FINISH_RENAME_LEVEL,
  REORDER_LEVELS,
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
  updateLevelsPending,
  updateLevelsFulfilled,
  updateLevelsRejected,
  deleteLevelPending,
  deleteLevelFulfilled,
  deleteLevelRejected,
} from '../actions/api';

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

export function* updateLevelsSaga(action) {
  yield put(updateLevelsPending());

  try {
    const res = yield call(updateLevels, action.levels);
    yield put(updateLevelsFulfilled(res));
  } catch (err) {
    yield put(updateLevelsRejected(err));
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
  yield takeLatest(DELETE_SELECTED_LEVEL_CONFIRMED, deleteLevelSaga);
  yield takeLatest([SAVE_LEVEL, FINISH_RENAME_LEVEL], updateLevelSaga);
  yield takeLatest(REORDER_LEVELS, updateLevelsSaga);
}

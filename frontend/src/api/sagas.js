import { takeLatest, put, call } from 'redux-saga/effects';

import {
  RETRIEVE_LEVELS,
  CREATE_NEW_LEVEL,
  COPY_LEVEL,
  DELETE_SELECTED_LEVEL_CONFIRMED,
  SAVE_LEVEL,
  FINISH_RENAME_LEVEL,
  REORDER_LEVELS,
} from 'levelManager/actions';
import {
  fetchLevels as apiFetchLevels,
  createLevel as apiCreateLevel,
  deleteLevel as apiDeleteLevel,
  updateLevel as apiUpdateLevel,
  updateLevels as apiUpdateLevels,
} from './index.js';
import { retrieveLevels, createLevel, updateLevel, updateLevels, deleteLevel } from './actions';

export function* retrieveLevelsSaga() {
  yield put(retrieveLevels.pending());

  try {
    const res = yield call(apiFetchLevels);
    yield put(retrieveLevels.fulfilled({ levels: res }));
  } catch (err) {
    yield put(retrieveLevels.rejected({ error: err }));
  }
}

export function* createLevelSaga(action) {
  yield put(createLevel.pending());

  try {
    const res = yield call(apiCreateLevel, action.level);
    yield put(createLevel.fulfilled({ oldLevel: action.level, newLevel: res }));
  } catch (err) {
    yield put(createLevel.rejected({ error: err }));
  }
}

export function* updateLevelSaga(action) {
  yield put(updateLevel.pending());

  try {
    const res = yield call(apiUpdateLevel, action.level);
    yield put(updateLevel.fulfilled({ level: res }));
  } catch (err) {
    yield put(updateLevel.rejected({ error: err }));
  }
}

export function* updateLevelsSaga(action) {
  yield put(updateLevels.pending());

  try {
    const res = yield call(apiUpdateLevels, action.levels);
    yield put(updateLevels.fulfilled({ levels: res }));
  } catch (err) {
    yield put(updateLevels.rejected({ error: err }));
  }
}

export function* deleteLevelSaga(action) {
  yield put(deleteLevel.pending());

  try {
    const res = yield call(apiDeleteLevel, action.id);
    yield put(deleteLevel.fulfilled({ level: res }));
  } catch (err) {
    yield put(deleteLevel.rejected({ error: err }));
  }
}

export default function* levelManagerSagas() {
  yield takeLatest(RETRIEVE_LEVELS, retrieveLevelsSaga);
  yield takeLatest([CREATE_NEW_LEVEL, COPY_LEVEL], createLevelSaga);
  yield takeLatest(DELETE_SELECTED_LEVEL_CONFIRMED, deleteLevelSaga);
  yield takeLatest([SAVE_LEVEL, FINISH_RENAME_LEVEL], updateLevelSaga);
  yield takeLatest(REORDER_LEVELS, updateLevelsSaga);
}

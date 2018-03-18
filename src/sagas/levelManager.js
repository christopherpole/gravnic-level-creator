import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import shortid from 'shortid';

import Grid from '../components/levelEditor/grid';
import { fetchLevels, createLevel, deleteLevel } from '../api/levelManager';
import {
  RETRIEVE_LEVELS,
  CREATE_LEVEL,
  DELETE_LEVEL,
  retrieveLevelsPending,
  retrieveLevelsFulfilled,
  retrieveLevelsRejected,
  createLevelPending,
  createLevelFulfilled,
  createLevelRejected,
  deleteLevelPending,
  deleteLevelFulfilled,
  deleteLevelRejected,
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

export function* createLevelSaga() {
  const newLevel = {
    id: shortid.generate(),
    name: 'New level',
    tiles: [...Array(Grid.SIZE * Grid.SIZE)].map((_, index) => ({
      position: index,
      selectedTileId: 0,
    })),
  };
  yield put(createLevelPending(newLevel));

  try {
    const res = yield call(createLevel, newLevel);
    yield put(createLevelFulfilled(newLevel, res));
  } catch (err) {
    yield put(createLevelRejected(err));
  }
}

export function* deleteLevelSaga() {
  const state = yield select();
  const { selectedLevelId } = state.levelManager;

  yield put(deleteLevelPending(selectedLevelId));

  try {
    const res = yield call(deleteLevel, selectedLevelId);
    yield put(deleteLevelFulfilled(res));
  } catch (err) {
    yield put(deleteLevelRejected(err));
  }
}

export default function* levelManagerSagas() {
  yield takeLatest(RETRIEVE_LEVELS, retrieveLevelsSaga);
  yield takeLatest(CREATE_LEVEL, createLevelSaga);
  yield takeLatest(DELETE_LEVEL, deleteLevelSaga);
}

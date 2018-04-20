import { calulateNextGameState } from 'gravnic-game';
import { takeLatest, delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { CHANGE_GRAVITY_DIRECTION, updateGameState, entitiesStoppedMoving } from './actions';

export function* changeGravityDirectionSaga(action) {
  const state = yield select();
  const { gameSpeed } = state.levelPreview;
  let { gameState } = state.levelPreview;

  do {
    gameState = calulateNextGameState(gameState, action.direction);

    if (gameState) {
      yield put(updateGameState(gameState));
      yield call(delay, gameSpeed);
    }
  } while (gameState);

  yield put(entitiesStoppedMoving());
}

export default function* levelManagerSagas() {
  yield takeLatest(CHANGE_GRAVITY_DIRECTION, changeGravityDirectionSaga);
}

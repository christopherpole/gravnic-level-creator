import { calulateNextGameState } from 'gravnic-game';
import { takeLatest, delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import {
  CHANGE_GRAVITY_DIRECTION,
  UNDO_MOVE,
  updateGameState,
  undoMoveStep,
  undoMoveFinished,
  entitiesStoppedMoving,
} from './actions';

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

export function* undoMoveSaga() {
  const state = yield select();
  const { gameSpeed } = state.levelPreview;
  const lastMoveLength =
    state.levelPreview.gameHistory[state.levelPreview.gameHistory.length - 1].length;
  let noOfMovesRemaining = lastMoveLength;

  while (noOfMovesRemaining--) {
    yield put(undoMoveStep());
    yield call(delay, gameSpeed);
  }

  yield put(undoMoveFinished());
}

export default function* levelManagerSagas() {
  yield takeLatest(CHANGE_GRAVITY_DIRECTION, changeGravityDirectionSaga);
  yield takeLatest(UNDO_MOVE, undoMoveSaga);
}

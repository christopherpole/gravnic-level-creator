import { changeGravityDirection } from 'gravnic-game';
import { takeLatest, delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { MAKE_MOVE, UNDO_MOVE, setGameState, makeMoveFinished, undoMoveFinished } from './actions';

export function* makeMoveSaga(action) {
  const state = yield select();
  const { gameSpeed, gameState } = state.levelPreview;
  const gameStates = changeGravityDirection(gameState, action.direction);

  for (let i = 0; i < gameStates.length; i++) {
    yield put(setGameState(gameStates[i]));
    yield call(delay, gameSpeed);
  }

  yield put(makeMoveFinished(gameStates));
}

export function* undoMoveSaga() {
  const state = yield select();
  const { gameSpeed } = state.levelPreview;
  const gameStates = state.levelPreview.gameHistory[state.levelPreview.gameHistory.length - 1];

  for (let i = gameStates.length - 1; i >= 0; i--) {
    yield put(setGameState(gameStates[i]));
    yield call(delay, gameSpeed);
  }

  yield put(undoMoveFinished());
}

export default function* levelManagerSagas() {
  yield takeLatest(MAKE_MOVE, makeMoveSaga);
  yield takeLatest(UNDO_MOVE, undoMoveSaga);
}

import { changeGravityDirection } from 'gravnic-game';
import { delay } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import { DEFAULT_GAME_SPEED, FADING_GAME_SPEED, FAST_GAME_MODIFIER } from 'config/settings';
import {
  MAKE_MOVE,
  UNDO_MOVE,
  setGameState,
  makeMoveFinished,
  undoMoveFinished,
  setGameSpeed,
} from './actions';

//  @TODO: the solution for checking for fading elements isn't great. Should consider
//  associating this with each game state from gravnic game via meta data
export function* makeMoveSaga(action) {
  const state = yield select();
  const { gameState, fastMode } = state.levelPreview;
  const gameStates = changeGravityDirection(gameState, action.direction);
  let { gameSpeed } = state.levelPreview;
  let fadingSpeed = false;
  let fading = false;

  for (let i = 0; i < gameStates.length; i++) {
    //  Check the gamestate for fading entities
    fading = false;
    for (let j = 0; j < gameStates[i].length; j++) {
      for (let k = 0; k < gameStates[i][j].length; k++) {
        //  If we find a fading entity then take note
        if (gameStates[i][j][k].movableEntity && gameStates[i][j][k].movableEntity.fading) {
          fading = true;
        }
      }
    }

    //  If entities wern't fading but now they are, slow the game speed down
    if (fading && !fadingSpeed) {
      yield put(setGameSpeed(FADING_GAME_SPEED));
      gameSpeed = fastMode ? FADING_GAME_SPEED * FAST_GAME_MODIFIER : FADING_GAME_SPEED;
      fadingSpeed = true;
    } else if (!fading && fadingSpeed) {
      //  If entities were fading but now they aren't, crank the game speed back up
      yield put(setGameSpeed(DEFAULT_GAME_SPEED));
      gameSpeed = fastMode ? DEFAULT_GAME_SPEED * FAST_GAME_MODIFIER : DEFAULT_GAME_SPEED;
      fadingSpeed = false;
    }

    //  Make a move step
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

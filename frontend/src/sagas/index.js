import apiSagas from './api';

export default function* rootSaga() {
  yield [apiSagas()];
}

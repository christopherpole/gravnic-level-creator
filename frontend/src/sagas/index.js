import apiSagas from './api';
import levelManagerSagas from './levelManager';

export default function* rootSaga() {
  yield [apiSagas(), levelManagerSagas()];
}

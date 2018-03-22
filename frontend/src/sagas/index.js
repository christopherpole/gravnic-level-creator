import levelManagerSagas from './levelManager';

export default function* rootSaga() {
  yield [levelManagerSagas()];
}

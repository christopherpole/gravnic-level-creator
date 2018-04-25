import apiSagas from './api/sagas';
import levelManagerSagas from './levelManager/sagas';
import levelPreviewSagas from './levelPreview/sagas';

export default function* rootSaga() {
  yield [apiSagas(), levelManagerSagas(), levelPreviewSagas()];
}

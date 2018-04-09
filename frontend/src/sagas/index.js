import apiSagas from './api';
import levelManagerSagas from './levelManager';
import levelPreviewSagas from './levelPreview';

export default function* rootSaga() {
  yield [apiSagas(), levelManagerSagas(), levelPreviewSagas()];
}

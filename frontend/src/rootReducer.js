import { combineReducers } from 'redux';

import levelEditorReducer from 'levelEditor/reducer';
import levelManagerReducer from 'levelManager/reducer';
import levelPreviewReducer from 'levelPreview/reducer';

export default combineReducers({
  levelEditor: levelEditorReducer,
  levelManager: levelManagerReducer,
  levelPreview: levelPreviewReducer,
});

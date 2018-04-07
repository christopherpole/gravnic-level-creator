import { combineReducers } from 'redux';

import levelEditorReducer from './levelEditor';
import levelManagerReducer from './levelManager';
import levelPreviewReducer from './levelPreview';

export default combineReducers({
  levelEditor: levelEditorReducer,
  levelManager: levelManagerReducer,
  levelPreview: levelPreviewReducer,
});

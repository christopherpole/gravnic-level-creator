import { combineReducers } from 'redux';

import levelEditorReducer from './levelEditor';
import levelManagerReducer from './levelManager';

export default combineReducers({
  levelEditor: levelEditorReducer,
  levelManager: levelManagerReducer,
});

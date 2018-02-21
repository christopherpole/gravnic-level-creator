import { combineReducers } from 'redux';

import levelEditorReducer from './levelEditor';

export default combineReducers({
  levelEditor: levelEditorReducer,
});

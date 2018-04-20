import { createStore } from 'redux';

import levelEditorReducer from 'levelEditor/reducer';
import levelManagerReducer from 'levelManager/reducer';
import levelPreviewReducer from 'levelPreview/reducer';
import { UPDATE_TILE } from 'levelEditor/actions';
import rootReducer from './rootReducer';

describe('The root reducer', () => {
  const store = createStore(rootReducer);

  it('Matches the same state as reducers called with empty actions', () => {
    expect(store.getState().levelEditor).toEqual(levelEditorReducer(undefined, {}));
    expect(store.getState().levelManager).toEqual(levelManagerReducer(undefined, {}));
    expect(store.getState().levelPreview).toEqual(levelPreviewReducer(undefined, {}));
  });

  it('Allows the child reducers handle actions', () => {
    const action = { type: UPDATE_TILE };
    store.dispatch(action);
    expect(store.getState().levelEditor).toEqual(levelEditorReducer(undefined, action));
  });
});

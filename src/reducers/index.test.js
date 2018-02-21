import { createStore } from 'redux';

import rootReducer from './index';
import levelEditorReducer from './levelEditor';
import { UPDATE_TILE } from '../actions/levelEditor';

describe('The root reducer', () => {
  const store = createStore(rootReducer);

  it('matches the same state as reducers called with empty actions', () => {
    expect(store.getState().levelEditor).toEqual(levelEditorReducer(undefined, {}));
  });

  it('allows the child reducers handle actions', () => {
    const action = { type: UPDATE_TILE };
    store.dispatch(action);
    expect(store.getState().levelEditor).toEqual(levelEditorReducer(undefined, action));
  });
});

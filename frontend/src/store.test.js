import store from './store';
import { initialState as levelEditorInitialState } from './reducers/levelEditor';
import { initialState as levelManagerInitialState } from './reducers/levelManager';
import { initialState as levelPreviewInitialState } from './reducers/levelPreview';

describe('The store', () => {
  it('Should initialize in the correct initial state', () => {
    const initialState = {
      levelEditor: levelEditorInitialState,
      levelManager: levelManagerInitialState,
      levelPreview: levelPreviewInitialState,
    };

    expect(store.getState()).toEqual(initialState);
  });
});

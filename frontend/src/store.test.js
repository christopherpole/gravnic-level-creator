import store from './store';
import { initialState as levelEditorInitialState } from './levelEditor/reducer';
import { initialState as levelManagerInitialState } from './levelManager/reducer';
import { initialState as levelPreviewInitialState } from './levelPreview/reducer';

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

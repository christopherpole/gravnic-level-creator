import store from './store';
import { initialState as levelEditorInitialState } from './reducers/levelEditor';
import { initialState as levelManagerInitialState } from './reducers/levelManager';

describe('The store', () => {
  it('Should initialize in the correct initial state', () => {
    const initialState = {
      levelEditor: levelEditorInitialState,
      levelManager: levelManagerInitialState,
    };

    expect(store.getState()).toEqual(initialState);
  });
});

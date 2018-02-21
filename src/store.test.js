import store from './store';
import { initialState as levelEditorInitialState } from './reducers/levelEditor';

describe('the store', () => {
  it('should initialize in the correct initial state', () => {
    const initialState = {
      levelEditor: levelEditorInitialState,
    };

    expect(store.getState()).toEqual(initialState);
  });
});

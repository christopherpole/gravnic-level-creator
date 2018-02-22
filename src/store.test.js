import store from './store';
import { initialState as levelEditorInitialState } from './reducers/levelEditor';

describe('The store', () => {
  it('Should initialize in the correct initial state', () => {
    const initialState = {
      levelEditor: levelEditorInitialState,
    };

    expect(store.getState()).toEqual(initialState);
  });
});

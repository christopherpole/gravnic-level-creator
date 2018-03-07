import { SELECT_LEVEL, selectLevel } from './levelManager';

describe('The level manager actions', () => {
  it('Should create an action select a level', () => {
    const expectedAction = {
      type: SELECT_LEVEL,
      selectedLevelId: 2,
    };

    expect(selectLevel(2)).toEqual(expectedAction);
  });
});

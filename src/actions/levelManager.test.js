import { spy } from 'sinon';

import { SELECT_LEVEL, LOAD_LEVEL, selectLevel, loadLevel } from './levelManager';

describe('The level manager actions', () => {
  it('Should create an action select a level', () => {
    const expectedAction = {
      type: SELECT_LEVEL,
      selectedLevelId: 2,
    };

    expect(selectLevel(2)).toEqual(expectedAction);
  });

  it('Should create an action to load a level', () => {
    const fn = loadLevel();
    const dispatchSpy = spy();
    const getState = () => ({
      levelManager: {
        selectedLevelId: 2,
        currentLevelId: null,
        levels: [
          {
            id: 1,
            name: 'Test level 1',
            tiles: [1, 2, 3],
          },
          {
            id: 2,
            name: 'Test level 2',
            tiles: [4, 5, 6],
          },
        ],
      },
    });

    expect(typeof fn).toBe('function');
    fn(dispatchSpy, getState);
    expect(dispatchSpy.calledOnce).toBe(true);
    expect(
      dispatchSpy.calledWith({
        type: LOAD_LEVEL,
        levelId: 2,
        tiles: [4, 5, 6],
      }),
    ).toBe(true);
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { Level, Wrapper } from './level';

configure({ adapter: new Adapter() });

describe('The level', () => {
  let props;

  beforeEach(() => {
    props = {
      id: '22',
      name: 'Test level',
      tiles: [
        {
          selectedTileId: 1,
          position: 0,
        },
        {
          selectedTileId: 2,
          position: 1,
        },
        {
          selectedTileId: 3,
          position: 2,
        },
      ],
      selectLevelAction: () => {},
    };
  });

  it('Renders without exploding', () => {
    const level = shallow(<Level {...props} />);

    expect(level).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const level = shallow(<Level {...props} />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Fires the select level action when clicking on a level', () => {
    const levelClickSpy = spy();
    const level = shallow(<Level {...props} selectLevelAction={levelClickSpy} />);
    const levelWrapper = level.find(Wrapper);
    levelWrapper.simulate('click');

    expect(levelClickSpy.calledOnce).toBe(true);
    expect(levelClickSpy.calledWith('22')).toBe(true);
  });
});

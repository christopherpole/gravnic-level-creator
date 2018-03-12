import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { Level, Wrapper } from './level';
import testLevels from '../../data/testLevels';

configure({ adapter: new Adapter() });

describe('The level', () => {
  let props;

  beforeEach(() => {
    props = {
      ...testLevels[0],
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
    expect(levelClickSpy.calledWith(testLevels[0].id)).toBe(true);
  });
});

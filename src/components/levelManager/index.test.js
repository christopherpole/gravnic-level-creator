import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import LevelManager from './index';

configure({ adapter: new Adapter() });

describe('The level manager', () => {
  it('Renders without exploding', () => {
    const levelManager = shallow(<LevelManager />);

    expect(levelManager).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const levelManager = shallow(<LevelManager />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });
});

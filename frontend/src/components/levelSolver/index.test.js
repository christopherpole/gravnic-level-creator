import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import LevelSolver from './index';

configure({ adapter: new Adapter() });

describe('The root layout', () => {
  it('Renders without exploding', () => {
    const levelSolver = shallow(<LevelSolver />);

    expect(levelSolver).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const levelSolver = shallow(<LevelSolver />);

    expect(toJson(levelSolver)).toMatchSnapshot();
  });
});

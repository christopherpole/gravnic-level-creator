import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { LevelSolver } from './index';

configure({ adapter: new Adapter() });

const props = {};

describe('<LevelSolver />', () => {
  it('Renders without exploding', () => {
    const levelSolver = shallow(<LevelSolver {...props} />);

    expect(levelSolver).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const levelSolver = shallow(<LevelSolver {...props} />);

    expect(toJson(levelSolver)).toMatchSnapshot();
  });

  it('Matches the current snapshot when a solution is present', () => {
    const levelSolver = shallow(<LevelSolver {...props} solution={['UP', 'DOWN']} />);

    expect(toJson(levelSolver)).toMatchSnapshot();
  });
});

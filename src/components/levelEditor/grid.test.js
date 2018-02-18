import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Grid from './grid';

configure({ adapter: new Adapter() });

it('renders without exploding', () => {
  const grid = shallow(<Grid />);

  expect(grid).toHaveLength(1);
});

it('matches the current snapshot', () => {
  const grid = shallow(<Grid />);

  expect(toJson(grid)).toMatchSnapshot();
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import LevelEditor from './index';

configure({ adapter: new Adapter() });

it('renders without exploding', () => {
  const levelEditor = shallow(<LevelEditor />);

  expect(levelEditor).toHaveLength(1);
});

it('matches the current snapshot', () => {
  const levelEditor = shallow(<LevelEditor />);

  expect(toJson(levelEditor)).toMatchSnapshot();
});

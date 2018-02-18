import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import TileSelector from './tileSelector';

configure({ adapter: new Adapter() });

it('renders without exploding', () => {
  const tileSelector = shallow(<TileSelector />);

  expect(tileSelector).toHaveLength(1);
});

it('matches the current snapshot', () => {
  const tileSelector = shallow(<TileSelector />);

  expect(toJson(tileSelector)).toMatchSnapshot();
});

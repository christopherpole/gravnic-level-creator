import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Tile from './tile';

configure({ adapter: new Adapter() });

describe('Tiles', () => {
  it('Renders without exploding', () => {
    const tile = shallow(<Tile />);

    expect(tile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const tile = shallow(<Tile />);
    expect(toJson(tile)).toMatchSnapshot();
  });
});

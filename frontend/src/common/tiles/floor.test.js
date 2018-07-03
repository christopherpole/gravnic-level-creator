import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import FloorTile from './floor';

configure({ adapter: new Adapter() });

describe('<FloorTile />', () => {
  it('Renders without exploding', () => {
    const floorTile = shallow(<FloorTile />);

    expect(floorTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const floorTile = shallow(<FloorTile />);

    expect(toJson(floorTile)).toMatchSnapshot();
  });
});

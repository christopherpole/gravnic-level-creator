import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import RainbowTile from './rainbowBlock';

configure({ adapter: new Adapter() });

describe('<RainbowTile />', () => {
  it('Renders without exploding', () => {
    const rainbowTile = shallow(<RainbowTile />);

    expect(rainbowTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const rainbowTile = shallow(<RainbowTile />);

    expect(toJson(rainbowTile)).toMatchSnapshot();
  });
});

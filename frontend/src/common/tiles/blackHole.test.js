import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import BlackHoleTile from './blackHole';

configure({ adapter: new Adapter() });

describe('<BlackHoleTile />', () => {
  it('Renders without exploding', () => {
    const blackHoleTile = shallow(<BlackHoleTile />);

    expect(blackHoleTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const blackHoleTile = shallow(<BlackHoleTile />);

    expect(toJson(blackHoleTile)).toMatchSnapshot();
  });
});

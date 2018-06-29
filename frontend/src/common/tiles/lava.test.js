import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import LavaTile from './lava';

configure({ adapter: new Adapter() });

describe('<LavaTile />', () => {
  it('Renders without exploding', () => {
    const lavaTile = shallow(<LavaTile />);

    expect(lavaTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const lavaTile = shallow(<LavaTile />);

    expect(toJson(lavaTile)).toMatchSnapshot();
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import GlassTile from './glass';

configure({ adapter: new Adapter() });

describe('<GlassTile />', () => {
  it('Renders without exploding', () => {
    const glassTile = shallow(<GlassTile />);

    expect(glassTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const glassTile = shallow(<GlassTile />);

    expect(toJson(glassTile)).toMatchSnapshot();
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import StickySpotTile from './stickySpot';

configure({ adapter: new Adapter() });

describe('<StickySpotTile />', () => {
  it('Renders without exploding', () => {
    const stickySpotTile = shallow(<StickySpotTile />);

    expect(stickySpotTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const stickySpotTile = shallow(<StickySpotTile />);

    expect(toJson(stickySpotTile)).toMatchSnapshot();
  });
});

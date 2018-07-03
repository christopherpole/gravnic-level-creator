import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import BlankTile from './blank';

configure({ adapter: new Adapter() });

describe('<BlankTile />', () => {
  it('Renders without exploding', () => {
    const blankTile = shallow(<BlankTile />);

    expect(blankTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const blankTile = shallow(<BlankTile />);

    expect(toJson(blankTile)).toMatchSnapshot();
  });
});

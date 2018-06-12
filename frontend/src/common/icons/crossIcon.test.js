import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import CrossIcon from './CrossIcon';

configure({ adapter: new Adapter() });

describe('<CrossIcon />', () => {
  it('Renders without exploding', () => {
    const crossIcon = shallow(<CrossIcon />);

    expect(crossIcon).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const crossIcon = shallow(<CrossIcon />);

    expect(toJson(crossIcon)).toMatchSnapshot();
  });
});

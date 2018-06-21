import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import TickIcon from './tickIcon';

configure({ adapter: new Adapter() });

describe('<TickIcon />', () => {
  it('Renders without exploding', () => {
    const tickIcon = shallow(<TickIcon />);

    expect(tickIcon).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const tickIcon = shallow(<TickIcon />);

    expect(toJson(tickIcon)).toMatchSnapshot();
  });
});

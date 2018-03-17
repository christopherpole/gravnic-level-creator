import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import WarningIcon from './WarningIcon';

configure({ adapter: new Adapter() });

describe('Loading icon', () => {
  it('Renders without exploding', () => {
    const tile = shallow(<WarningIcon />);

    expect(tile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const tile = shallow(<WarningIcon />);

    expect(toJson(tile)).toMatchSnapshot();
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import LoadingIcon from './loadingIcon';

configure({ adapter: new Adapter() });

describe('Loading icon', () => {
  it('Renders without exploding', () => {
    const tile = shallow(<LoadingIcon />);

    expect(tile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const tile = shallow(<LoadingIcon />);

    expect(toJson(tile)).toMatchSnapshot();
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import StarIcon from './starIcon';

configure({ adapter: new Adapter() });

describe('<LoadingIcon />', () => {
  it('Renders without exploding', () => {
    const tile = shallow(<StarIcon />);

    expect(tile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const tile = shallow(<StarIcon />);

    expect(toJson(tile)).toMatchSnapshot();
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import CrateTile from './crate';

configure({ adapter: new Adapter() });

describe('<CrateTile />', () => {
  it('Renders without exploding', () => {
    const crateTile = shallow(<CrateTile />);

    expect(crateTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const crateTile = shallow(<CrateTile />);

    expect(toJson(crateTile)).toMatchSnapshot();
  });

  it('Matches the current snapshot whe the create has been moved', () => {
    const crateTile = shallow(<CrateTile moved />);

    expect(toJson(crateTile)).toMatchSnapshot();
  });
});

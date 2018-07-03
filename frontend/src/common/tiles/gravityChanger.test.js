import React from 'react';
import { MOVE_DOWN } from 'gravnic-game';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import GravityChangerTile from './gravityChanger';

configure({ adapter: new Adapter() });

describe('<GravityChangerTile />', () => {
  let props;

  beforeEach(() => {
    props = {
      direction: MOVE_DOWN,
    };
  });

  it('Renders without exploding', () => {
    const gravityChanger = shallow(<GravityChangerTile {...props} />);

    expect(gravityChanger).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const gravityChanger = shallow(<GravityChangerTile {...props} />);

    expect(toJson(gravityChanger)).toMatchSnapshot();
  });
});

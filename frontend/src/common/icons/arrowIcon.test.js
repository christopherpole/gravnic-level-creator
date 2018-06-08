import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { MOVE_LEFT } from 'gravnic-game';

import ArrowIcon from './arrowIcon';

configure({ adapter: new Adapter() });

describe('<ArrowIcon />', () => {
  let props;

  beforeEach(() => {
    props = {
      direction: MOVE_LEFT,
    };
  });

  it('Renders without exploding', () => {
    const tile = shallow(<ArrowIcon {...props} />);

    expect(tile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const tile = shallow(<ArrowIcon {...props} />);

    expect(toJson(tile)).toMatchSnapshot();
  });
});

import React from 'react';
import { MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT } from 'gravnic-game';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import ArrowsDisplay from './arrowsDisplay';

configure({ adapter: new Adapter() });

describe('<ArrowsDisplay />', () => {
  let props;

  beforeEach(() => {
    props = {
      arrows: [MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT],
    };
  });

  it('Renders without exploding', () => {
    const arrowsDisplay = shallow(<ArrowsDisplay {...props} />);

    expect(arrowsDisplay).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const arrowsDisplay = shallow(<ArrowsDisplay {...props} />);

    expect(toJson(arrowsDisplay)).toMatchSnapshot();
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT } from 'gravnic-game';

import { MoveHistoryDisplay } from './moveHistoryDisplay';

configure({ adapter: new Adapter() });

describe('<MoveHistoryDisplay />', () => {
  let props;

  beforeEach(() => {
    props = {
      moveHistory: [MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT],
    };
  });

  it('Renders without exploding', () => {
    const moveHistoryDisplay = shallow(<MoveHistoryDisplay {...props} />);

    expect(moveHistoryDisplay).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const moveHistoryDisplay = shallow(<MoveHistoryDisplay {...props} />);

    expect(toJson(moveHistoryDisplay)).toMatchSnapshot();
  });
});

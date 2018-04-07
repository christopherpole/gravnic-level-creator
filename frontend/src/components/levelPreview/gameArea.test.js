import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { GameArea } from './gameArea';

configure({ adapter: new Adapter() });

describe('The game area', () => {
  let props;

  beforeEach(() => {
    props = {
      gameState: [[1, 2], [1, 3]],
    };
  });

  it('Renders without exploding', () => {
    const gameArea = shallow(<GameArea {...props} />);

    expect(gameArea).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const gameArea = shallow(<GameArea {...props} />);

    expect(toJson(gameArea)).toMatchSnapshot();
  });
});

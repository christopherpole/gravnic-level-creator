import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { GameArea } from './gameArea';

configure({ adapter: new Adapter() });

describe('<GameArea />', () => {
  let props;

  beforeEach(() => {
    props = {
      entitiesData: { 1: { xPos: 10, yPos: 10, id: 123, entityId: 1 } },
      changeGravityDirectionAction: () => {},
      entitiesMoving: false,
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

  it(
    'Calls the make move action when the user presses the arrow keys on the keyboard and if a move is not taking place',
  );
});

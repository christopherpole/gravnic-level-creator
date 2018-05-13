import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { ENTITIES } from 'gravnic-game';

import { LevelPreview } from './index';

configure({ adapter: new Adapter() });

describe('<LevelPreview />', () => {
  let props;

  beforeEach(() => {
    props = {
      entitiesData: {
        1: { xPos: 10, yPos: 10, id: 123, entityId: ENTITIES.BLOCK, isMovableEntity: true },
      },
      makeMoveAction: () => {},
      entitiesMoving: false,
    };
  });

  it('Renders without exploding', () => {
    const gameArea = shallow(<LevelPreview {...props} />);

    expect(gameArea).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const gameArea = shallow(<LevelPreview {...props} />);

    expect(toJson(gameArea)).toMatchSnapshot();
  });

  it(
    'Calls the make move action when the user presses the arrow keys on the keyboard and if a move is not taking place',
  );
});

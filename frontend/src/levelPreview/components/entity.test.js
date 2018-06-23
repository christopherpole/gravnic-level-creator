import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { ENTITIES } from 'gravnic-game';

import { Entity } from './entity';

configure({ adapter: new Adapter() });

describe('<Entity />', () => {
  let props;

  beforeEach(() => {
    props = {
      entity: {
        entityId: ENTITIES.BLOCK,
        color: '#ff0000',
      },
      xPos: 10,
      yPos: 20,
      gameSpeed: 100,
      fading: false,
      isMovableEntity: false,
    };
  });

  it('Renders without exploding', () => {
    const entity = shallow(<Entity {...props} />);

    expect(entity).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const entity = shallow(<Entity {...props} />);

    expect(toJson(entity)).toMatchSnapshot();
  });
});

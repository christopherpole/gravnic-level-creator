import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { ENTITIES } from 'gravnic-game';

import { Tile } from './index';

configure({ adapter: new Adapter() });

describe('<Tile />', () => {
  let props;

  beforeEach(() => {
    props = {
      entity: {
        entityId: ENTITIES.FLOOR,
        stuck: false,
        shrinking: false,
        fading: false,
        moveSpeed: 100,
      },
    };
  });

  it('Renders without exploding', () => {
    const tile = shallow(<Tile {...props} />);

    expect(tile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const tile = shallow(<Tile {...props} />);
    expect(toJson(tile)).toMatchSnapshot();
  });

  it('Matches the current snapshot with a missing tile', () => {
    const tile = shallow(<Tile entity={{ ...props.entity, entityId: 'notanactualid' }} />);
    expect(toJson(tile)).toMatchSnapshot();
  });
});

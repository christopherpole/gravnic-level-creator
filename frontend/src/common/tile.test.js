import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { ENTITIES } from 'gravnic-game';

import { Tile } from './tile';

configure({ adapter: new Adapter() });

describe('<Tile />', () => {
  let props;

  beforeEach(() => {
    props = {
      entity: {
        entityId: ENTITIES.BLOCK,
        color: '#ff0000',
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
});

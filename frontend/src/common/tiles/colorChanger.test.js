import React from 'react';
import { ENTITIES } from 'gravnic-game';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import ColorChangerTile from './colorChanger';

configure({ adapter: new Adapter() });

describe('<ColorChangerTile />', () => {
  let props;

  beforeEach(() => {
    props = {
      targetEntity: {
        entityId: ENTITIES.BLOCK.id,
        color: '#ff0000',
      },
    };
  });

  it('Renders without exploding', () => {
    const colorChanger = shallow(<ColorChangerTile {...props} />);

    expect(colorChanger).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const colorChanger = shallow(<ColorChangerTile {...props} />);

    expect(toJson(colorChanger)).toMatchSnapshot();
  });
});

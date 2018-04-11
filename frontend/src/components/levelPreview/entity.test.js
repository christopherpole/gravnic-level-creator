import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { Entity } from './entity';

configure({ adapter: new Adapter() });

describe('Level preview entities', () => {
  let props;

  beforeEach(() => {
    props = {
      entityId: 3,
      xPos: 10,
      yPos: 20,
      gameSpeed: 100,
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

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import SmartBombTile from './smartBomb';

configure({ adapter: new Adapter() });

describe('<SmartBombTile />', () => {
  it('Renders without exploding', () => {
    const smartBombTile = shallow(<SmartBombTile />);

    expect(smartBombTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const smartBombTile = shallow(<SmartBombTile />);

    expect(toJson(smartBombTile)).toMatchSnapshot();
  });
});

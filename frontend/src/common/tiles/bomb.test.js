import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import BombTile from './bomb';

configure({ adapter: new Adapter() });

describe('<BombTile />', () => {
  it('Renders without exploding', () => {
    const bombTile = shallow(<BombTile />);

    expect(bombTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const bombTile = shallow(<BombTile />);

    expect(toJson(bombTile)).toMatchSnapshot();
  });

  it('Matches the current snapshot when exploding', () => {
    const bombTile = shallow(<BombTile exploding />);

    expect(toJson(bombTile)).toMatchSnapshot();
  });
});

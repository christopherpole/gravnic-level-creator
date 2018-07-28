import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import CrusherTile from './crusher';

configure({ adapter: new Adapter() });

describe('<CrusherTile />', () => {
  it('Renders without exploding', () => {
    const crusherTile = shallow(<CrusherTile />);

    expect(crusherTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const crusherTile = shallow(<CrusherTile />);

    expect(toJson(crusherTile)).toMatchSnapshot();
  });

  it('Matches the current snapshot when exploding', () => {
    const crusherTile = shallow(<CrusherTile exploding />);

    expect(toJson(crusherTile)).toMatchSnapshot();
  });
});

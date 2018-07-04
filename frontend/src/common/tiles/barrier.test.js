import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import BarrierTile from './barrier';

configure({ adapter: new Adapter() });

describe('<BarrierTile />', () => {
  it('Renders without exploding', () => {
    const barrierTile = shallow(<BarrierTile />);

    expect(barrierTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const barrierTile = shallow(<BarrierTile />);

    expect(toJson(barrierTile)).toMatchSnapshot();
  });

  it('Matches the current snapshot with a color', () => {
    const barrierTile = shallow(<BarrierTile color="#ff00000" />);

    expect(toJson(barrierTile)).toMatchSnapshot();
  });

  it('Matches the current snapshot when unpowered', () => {
    const barrierTile = shallow(<BarrierTile powered={false} />);

    expect(toJson(barrierTile)).toMatchSnapshot();
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import TeleporterTile from './teleporter';

configure({ adapter: new Adapter() });

describe('<TeleporterTile />', () => {
  it('Renders without exploding', () => {
    const teleporterTile = shallow(<TeleporterTile />);

    expect(teleporterTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const teleporterTile = shallow(<TeleporterTile />);

    expect(toJson(teleporterTile)).toMatchSnapshot();
  });
});

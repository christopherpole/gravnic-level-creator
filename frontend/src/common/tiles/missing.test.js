import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import MissingTile from './missing';

configure({ adapter: new Adapter() });

describe('<MissingTile />', () => {
  it('Renders without exploding', () => {
    const missingTile = shallow(<MissingTile />);

    expect(missingTile).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const missingTile = shallow(<MissingTile />);

    expect(toJson(missingTile)).toMatchSnapshot();
  });
});

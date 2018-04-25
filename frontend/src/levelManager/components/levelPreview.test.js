import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import testLevels from 'data/testLevels';
import LevelPreview from './levelPreview';

configure({ adapter: new Adapter() });

describe('<LevelPreview />', () => {
  let props;

  beforeEach(() => {
    props = {
      tiles: testLevels[0].tiles,
    };
  });

  it('Renders without exploding', () => {
    const level = shallow(<LevelPreview {...props} />);

    expect(level).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const level = shallow(<LevelPreview {...props} />);

    expect(toJson(level)).toMatchSnapshot();
  });
});

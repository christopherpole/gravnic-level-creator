import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import LevelPreview from './levelPreview';

configure({ adapter: new Adapter() });

describe('The level preview', () => {
  let props;

  beforeEach(() => {
    props = {
      tiles: [
        {
          selectedTileId: 1,
          position: 0,
        },
        {
          selectedTileId: 2,
          position: 1,
        },
        {
          selectedTileId: 3,
          position: 2,
        },
      ],
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

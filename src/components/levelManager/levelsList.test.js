import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { LevelsList } from './levelsList';

configure({ adapter: new Adapter() });

describe('The level manager', () => {
  let props;

  beforeEach(() => {
    props = {
      levels: [
        { id: '1', name: 'Test level 1', tiles: [1, 2, 3] },
        { id: '2', name: 'Test level 2', tiles: [1, 2, 3] },
        { id: '3', name: 'Test level 3', tiles: [1, 2, 3] },
      ],
      selectedLevelId: '3',
      currentLevelId: '3',
      retrieveLevels: () => {},
    };
  });
  it('Renders without exploding', () => {
    const levelManager = shallow(<LevelsList {...props} />);

    expect(levelManager).toHaveLength(1);
  });

  it('Matches the current snapshot with no levels', () => {
    const levelManager = shallow(<LevelsList {...props} levels={[]} />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot with levels', () => {
    const levelManager = shallow(<LevelsList {...props} />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });
});

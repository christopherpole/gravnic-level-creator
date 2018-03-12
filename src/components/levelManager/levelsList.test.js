import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { LevelsList } from './levelsList';
import testLevels from '../../data/testLevels';

configure({ adapter: new Adapter() });

describe('The level manager', () => {
  let props;

  beforeEach(() => {
    props = {
      levels: testLevels,
      selectedLevelId: testLevels[0].id,
      currentLevelId: testLevels[0].id,
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

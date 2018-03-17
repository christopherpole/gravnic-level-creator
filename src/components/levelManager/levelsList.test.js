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
      loading: false,
      error: false,
      levels: testLevels,
      selectedLevelId: testLevels[0].id,
      currentLevelId: testLevels[0].id,
      renamingLevelId: null,
      renamingLevelName: null,
      retrieveLevels: () => {},
    };
  });
  it('Renders without exploding', () => {
    const levelManager = shallow(<LevelsList {...props} />);

    expect(levelManager).toHaveLength(1);
  });

  it('Matches the current snapshot when loading levels from the server', () => {
    const levelManager = shallow(
      <LevelsList
        {...props}
        loading
        levels={[]}
        selectedLevelId={null}
        currentLevelId={null}
        renamingLevelId={null}
        renamingLevelName={null}
      />,
    );

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot if the was an issue communicating with the server', () => {
    const levelManager = shallow(<LevelsList {...props} levels={[]} error />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot with levels', () => {
    const levelManager = shallow(<LevelsList {...props} />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot with no levels', () => {
    const levelManager = shallow(<LevelsList {...props} levels={[]} />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot if a level is selected', () => {
    const levelManager = shallow(<LevelsList {...props} selectedLevelId="1" />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot if a level is the current level', () => {
    const levelManager = shallow(<LevelsList {...props} currentLevelId="1" />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot if a level is being renamed', () => {
    const levelManager = shallow(
      <LevelsList {...props} renamingLevelId="1" renamingLevelName="New name" />,
    );

    expect(toJson(levelManager)).toMatchSnapshot();
  });
});

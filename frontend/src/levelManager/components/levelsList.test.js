import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import testLevels from 'data/testLevels';
import { LevelsList } from './levelsList';

configure({ adapter: new Adapter() });

describe('<LevelsList />', () => {
  let props;

  beforeEach(() => {
    props = {
      sortedLevels: testLevels,
      selectedLevelId: testLevels[0].id,
      currentLevelId: testLevels[0].id,
      renamingLevelId: null,
      renamingLevelName: null,
      reorderLevelsAction: () => {},
    };
  });

  it('Renders without exploding', () => {
    const levelsList = shallow(<LevelsList {...props} />);

    expect(levelsList).toHaveLength(1);
  });

  it('Matches the current snapshot when loading levels from the server', () => {
    const levelsList = shallow(
      <LevelsList
        {...props}
        loading
        sortedLevels={[]}
        selectedLevelId={null}
        currentLevelId={null}
        renamingLevelId={null}
        renamingLevelName={null}
      />,
    );

    expect(toJson(levelsList)).toMatchSnapshot();
  });

  it('Matches the current snapshot if the was an issue communicating with the server', () => {
    const levelsList = shallow(<LevelsList {...props} sortedLevels={[]} error />);

    expect(toJson(levelsList)).toMatchSnapshot();
  });

  it('Matches the current snapshot with levels', () => {
    const levelsList = shallow(<LevelsList {...props} />);

    expect(toJson(levelsList)).toMatchSnapshot();
  });

  it('Matches the current snapshot with no levels', () => {
    const levelsList = shallow(<LevelsList {...props} sortedLevels={[]} />);

    expect(toJson(levelsList)).toMatchSnapshot();
  });

  it('Matches the current snapshot if a level is selected', () => {
    const levelsList = shallow(<LevelsList {...props} selectedLevelId="1" />);

    expect(toJson(levelsList)).toMatchSnapshot();
  });

  it('Matches the current snapshot if a level is the current level', () => {
    const levelsList = shallow(<LevelsList {...props} currentLevelId="1" />);

    expect(toJson(levelsList)).toMatchSnapshot();
  });

  it('Matches the current snapshot if a level is being renamed', () => {
    const levelsList = shallow(
      <LevelsList {...props} renamingLevelId="1" renamingLevelName="New name" />,
    );

    expect(toJson(levelsList)).toMatchSnapshot();
  });

  it('Fires the reorderLevels action when sorting the levels');
});

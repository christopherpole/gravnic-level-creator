import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

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
      retrieveLevelsAction: () => {},
    };
  });
  it('Renders without exploding', () => {
    const levelsList = shallow(<LevelsList {...props} />);

    expect(levelsList).toHaveLength(1);
  });

  it('Fires the retrieve levels action after mounting', () => {
    const retrieveLevelsActionSpy = spy();
    shallow(
      <LevelsList {...props} retrieveLevelsAction={retrieveLevelsActionSpy} levels={[]} error />,
    );

    expect(retrieveLevelsActionSpy.calledOnce).toBe(true);
  });

  it('Matches the current snapshot when loading levels from the server', () => {
    const levelsList = shallow(
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

    expect(toJson(levelsList)).toMatchSnapshot();
  });

  it('Matches the current snapshot if the was an issue communicating with the server', () => {
    const levelsList = shallow(<LevelsList {...props} levels={[]} error />);

    expect(toJson(levelsList)).toMatchSnapshot();
  });

  it('Matches the current snapshot with levels', () => {
    const levelsList = shallow(<LevelsList {...props} />);

    expect(toJson(levelsList)).toMatchSnapshot();
  });

  it('Matches the current snapshot with no levels', () => {
    const levelsList = shallow(<LevelsList {...props} levels={[]} />);

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
});

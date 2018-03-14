import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { Level, Wrapper, Input } from './level';
import testLevels from '../../data/testLevels';

configure({ adapter: new Adapter() });

describe('The level', () => {
  let props;

  beforeEach(() => {
    props = {
      ...testLevels[0],
      selectLevelAction: () => {},
      changeRenameLevelAction: () => {},
      isSelected: false,
      isCurrent: false,
      renamingValue: null,
    };
  });

  it('Renders without exploding', () => {
    const level = shallow(<Level {...props} />);

    expect(level).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const level = shallow(<Level {...props} />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Matches the current snapshot if selected', () => {
    const level = shallow(<Level {...props} isSelected />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Matches the current snapshot if current', () => {
    const level = shallow(<Level {...props} isCurrent />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Matches the current snapshot if renaming', () => {
    const level = shallow(<Level {...props} renamingValue="New level name" />);

    expect(toJson(level)).toMatchSnapshot();
  });

  it('Fires the select level action when clicking on a level', () => {
    const levelClickSpy = spy();
    const level = shallow(<Level {...props} selectLevelAction={levelClickSpy} />);
    const levelWrapper = level.find(Wrapper);
    levelWrapper.simulate('click');

    expect(levelClickSpy.calledOnce).toBe(true);
    expect(levelClickSpy.calledWith(testLevels[0].id)).toBe(true);
  });

  it('Focuses on the text input when renaming');

  it('Fires the change rename level event when editing the level name', () => {
    const levelNameChangeSpy = spy();
    const level = shallow(
      <Level
        {...props}
        changeRenameLevelAction={levelNameChangeSpy}
        renamingValue="New level name"
      />,
    );
    const levelWrapper = level.find(Input);
    levelWrapper.simulate('change', { target: { value: 'Test' } });

    expect(levelNameChangeSpy.calledOnce).toBe(true);
    expect(levelNameChangeSpy.calledWith('Test')).toBe(true);
  });

  it(
    'Finishes the finish rename level action if the user presses the return key while editing the name',
  );
});

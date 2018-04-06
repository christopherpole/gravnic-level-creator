import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { ManagerActions, StyledButton } from './managerActions';

configure({ adapter: new Adapter() });

describe('The level manager actions', () => {
  let props;

  beforeEach(() => {
    props = {
      createLevelAction: () => {},
      loadLevelAction: () => {},
      saveLevelAction: () => {},
      deleteSelectedLevelAction: () => {},
      copyLevelAction: () => {},
      beginRenameLevelAction: () => {},
      finishRenameLevelAction: () => {},
      buttonDisabledStates: {
        btnNew: false,
        btnLoad: false,
        btnSave: false,
        btnDelete: false,
        btnCopy: false,
        btnRename: false,
      },
    };
  });

  it('Renders without exploding', () => {
    const managerActions = shallow(<ManagerActions {...props} />);

    expect(managerActions).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const managerActions = shallow(<ManagerActions {...props} />);

    expect(toJson(managerActions)).toMatchSnapshot();
  });

  it('Matches the current snapshot with disabled buttons', () => {
    const managerActions = shallow(
      <ManagerActions
        {...props}
        buttonDisabledStates={{
          btnNew: true,
          btnLoad: true,
          btnSave: true,
          btnDelete: true,
          btnCopy: true,
          btnRename: true,
        }}
      />,
    );

    expect(toJson(managerActions)).toMatchSnapshot();
  });

  it('Fires the create level action when clicking the "create" button', () => {
    const createLevelSpy = spy();
    const managerActions = shallow(
      <ManagerActions {...props} createLevelAction={createLevelSpy} />,
    );
    const button = managerActions.find(StyledButton).at(0);
    button.simulate('click');

    expect(createLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the load level action when clicking the "load" button', () => {
    const loadLevelSpy = spy();
    const managerActions = shallow(<ManagerActions {...props} loadLevelAction={loadLevelSpy} />);
    const button = managerActions.find(StyledButton).at(1);
    button.simulate('click');

    expect(loadLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the save level action when clicking the "save" button', () => {
    const saveLevelSpy = spy();
    const managerActions = shallow(<ManagerActions {...props} saveLevelAction={saveLevelSpy} />);
    const button = managerActions.find(StyledButton).at(2);
    button.simulate('click');

    expect(saveLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the delete level action when clicking the "delete" button', () => {
    const deleteSelectedLevelSpy = spy();
    const managerActions = shallow(
      <ManagerActions {...props} deleteSelectedLevelAction={deleteSelectedLevelSpy} />,
    );
    const button = managerActions.find(StyledButton).at(3);
    button.simulate('click');

    expect(deleteSelectedLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the copy level action when clicking the "copy" button', () => {
    const copyLevelSpy = spy();
    const managerActions = shallow(<ManagerActions {...props} copyLevelAction={copyLevelSpy} />);
    const button = managerActions.find(StyledButton).at(4);
    button.simulate('click');

    expect(copyLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the begin rename level action when clicking the "rename" button', () => {
    const beginRenameLevelSpy = spy();
    const managerActions = shallow(
      <ManagerActions {...props} beginRenameLevelAction={beginRenameLevelSpy} />,
    );
    const button = managerActions.find(StyledButton).at(5);
    button.simulate('click');

    expect(beginRenameLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the finish rename level action when clicking the "done" button', () => {
    const finishRenameLevelSpy = spy();
    const managerActions = shallow(
      <ManagerActions
        {...props}
        renamingLevelId="1"
        finishRenameLevelAction={finishRenameLevelSpy}
      />,
    );
    const button = managerActions.find(StyledButton).at(5);
    button.simulate('click');

    expect(finishRenameLevelSpy.calledOnce).toBe(true);
  });
});

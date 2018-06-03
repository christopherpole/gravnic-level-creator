import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { PreviewToolbar } from './previewToolbar';

configure({ adapter: new Adapter() });

describe('<PreviewToolbar />', () => {
  let props;

  beforeEach(() => {
    props = {
      editLevelAction: () => {},
      restartLevelAction: () => {},
      undoMoveAction: () => {},
      setFastModeAction: () => {},
      buttonDisabledStates: {
        btnRestart: false,
        btnUndo: false,
      },
      fastMode: false,
    };
  });

  it('Renders without exploding', () => {
    const previewToolbar = shallow(<PreviewToolbar {...props} />);

    expect(previewToolbar).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const previewToolbar = shallow(<PreviewToolbar {...props} />);

    expect(toJson(previewToolbar)).toMatchSnapshot();
  });

  it('Matches the current snapshot when buttons are disabled', () => {
    const previewToolbar = shallow(
      <PreviewToolbar {...props} buttonDisabledStates={{ btnRestart: true, btnUndo: true }} />,
    );

    expect(toJson(previewToolbar)).toMatchSnapshot();
  });

  it('Fires the "editLevel" action when the edit level button is clicked', () => {
    const editLevelSpy = spy();
    const previewToolbar = shallow(<PreviewToolbar {...props} editLevelAction={editLevelSpy} />);
    const btnEditLevel = previewToolbar.find('#btn-edit');

    expect(editLevelSpy.calledOnce).toBe(false);
    btnEditLevel.simulate('click');
    expect(editLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the "restartLevel" action when the restart level button is clicked', () => {
    const restartLevelSpy = spy();
    const previewToolbar = shallow(
      <PreviewToolbar {...props} restartLevelAction={restartLevelSpy} />,
    );
    const btnRestartLevel = previewToolbar.find('#btn-restart');

    expect(restartLevelSpy.calledOnce).toBe(false);
    btnRestartLevel.simulate('click');
    expect(restartLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the "undoMove" action when the undo move button is clicked', () => {
    const undoMoveSpy = spy();
    const previewToolbar = shallow(<PreviewToolbar {...props} undoMoveAction={undoMoveSpy} />);
    const btnUndoMove = previewToolbar.find('#btn-undo');

    expect(undoMoveSpy.calledOnce).toBe(false);
    btnUndoMove.simulate('click');
    expect(undoMoveSpy.calledOnce).toBe(true);
  });

  it('Fires the "setFastModeAction" action with the fast speed when the set game speed button is clicked', () => {
    const setFastModeSpy = spy();
    const previewToolbar = shallow(
      <PreviewToolbar {...props} setFastModeAction={setFastModeSpy} />,
    );
    const btnSetFastMode = previewToolbar.find('#btn-set-game-speed');

    //  Initial state is normal speed, sets fast speed when clicking the first time
    expect(setFastModeSpy.calledOnce).toBe(false);
    btnSetFastMode.simulate('click');
    expect(setFastModeSpy.calledOnce).toBe(true);
    expect(setFastModeSpy.calledWith(true)).toBe(true);
    expect(toJson(previewToolbar)).toMatchSnapshot();
  });

  it('Fires the "setFastModeAction" action with the normal speed when the set game speed button is clicked again', () => {
    const setFastModeSpy = spy();
    const previewToolbar = shallow(
      <PreviewToolbar {...props} fastMode setFastModeAction={setFastModeSpy} />,
    );
    const btnSetFastMode = previewToolbar.find('#btn-set-game-speed');

    //  Initial state is fast speed, sets normal speed when clicking the second time
    expect(setFastModeSpy.calledOnce).toBe(false);
    btnSetFastMode.simulate('click');
    expect(setFastModeSpy.calledOnce).toBe(true);
    expect(setFastModeSpy.calledWith(false)).toBe(true);
    expect(toJson(previewToolbar)).toMatchSnapshot();
  });
});

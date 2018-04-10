import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { PreviewToolbar } from './previewToolbar';

configure({ adapter: new Adapter() });

describe('The preview toolbar', () => {
  let props;

  beforeEach(() => {
    props = {
      editLevelAction: () => {},
      restartLevelAction: () => {},
      undoMoveAction: () => {},
      gameHistory: [[[1, 2, 3]], [[4, 5, 6]]],
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

  it('Matches the current snapshot when there are no moves to be undone', () => {
    const previewToolbar = shallow(<PreviewToolbar {...props} gameHistory={[[[1, 2, 3]]]} />);

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
});

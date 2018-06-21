import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { EditorToolbar } from './editorToolbar';

configure({ adapter: new Adapter() });

describe('<EditorToolbar />', () => {
  let props;

  beforeEach(() => {
    props = {
      gameStateString: 'test',
      resetGridAction: () => {},
      previewLevelAction: () => {},
      solveLevelAction: () => {},
      cancelSolveLevelAction: () => {},
      buttonDisabledStates: {
        btnReset: true,
        btnPreview: true,
        btnExport: true,
      },
      solving: false,
    };
  });

  it('Renders without exploding', () => {
    const editorToolbar = shallow(<EditorToolbar {...props} />);

    expect(editorToolbar).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const editorToolbar = shallow(<EditorToolbar {...props} />);

    expect(toJson(editorToolbar)).toMatchSnapshot();
  });

  it('Matches the current when the buttons are enabled', () => {
    const editorToolbar = shallow(
      <EditorToolbar
        {...props}
        buttonDisabledStates={{ btnReset: false, btnPreview: false, btnExport: false }}
      />,
    );

    expect(toJson(editorToolbar)).toMatchSnapshot();
  });

  it('Matches the current when solving', () => {
    const editorToolbar = shallow(<EditorToolbar {...props} solving />);

    expect(toJson(editorToolbar)).toMatchSnapshot();
  });

  it('Fires the "previewLevel" action when the preview level button is clicked', () => {
    const previewLevelSpy = spy();
    const editorToolbar = shallow(
      <EditorToolbar {...props} previewLevelAction={previewLevelSpy} />,
    );
    const btnPreviewLevel = editorToolbar.find('#btn-preview');

    expect(previewLevelSpy.calledOnce).toBe(false);
    btnPreviewLevel.simulate('click');
    expect(previewLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the "resetGrid" action when the reset grid button is clicked', () => {
    const resetGridSpy = spy();
    const editorToolbar = shallow(<EditorToolbar {...props} resetGridAction={resetGridSpy} />);
    const btnResetGrid = editorToolbar.find('#btn-reset');

    expect(resetGridSpy.calledOnce).toBe(false);
    btnResetGrid.simulate('click');
    expect(resetGridSpy.calledOnce).toBe(true);
  });

  it('Fires the "solveLevel" action when the solve button is clicked', () => {
    const solveLevelSpy = spy();
    const editorToolbar = shallow(<EditorToolbar {...props} solveLevelAction={solveLevelSpy} />);
    const btnSolveLevel = editorToolbar.find('#btn-solve');

    expect(solveLevelSpy.calledOnce).toBe(false);
    btnSolveLevel.simulate('click');
    expect(solveLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the "cancelSolveLevel" action when the cancel button is clicked', () => {
    const cancelSolveLevelSpy = spy();
    const editorToolbar = shallow(
      <EditorToolbar {...props} solving cancelSolveLevelAction={cancelSolveLevelSpy} />,
    );
    const btnCancelSolveLevel = editorToolbar.find('#btn-cancel-solve');

    expect(cancelSolveLevelSpy.calledOnce).toBe(false);
    btnCancelSolveLevel.simulate('click');
    expect(cancelSolveLevelSpy.calledOnce).toBe(true);
  });

  it('Copies the game state to the clipboard after clicking the "export" button');
});

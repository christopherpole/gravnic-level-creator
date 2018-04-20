import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import Button from 'common/button';
import { EditorToolbar } from './editorToolbar';

configure({ adapter: new Adapter() });

describe('<EditorToolbar />', () => {
  let props;

  beforeEach(() => {
    props = {
      resetGridAction: () => {},
      previewLevelAction: () => {},
      buttonDisabledStates: {
        btnReset: true,
        btnPreview: true,
      },
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
      <EditorToolbar {...props} buttonDisabledStates={{ btnReset: false, btnPreview: false }} />,
    );

    expect(toJson(editorToolbar)).toMatchSnapshot();
  });

  it('Fires the "previewLevel" action when the preview level button is clicked', () => {
    const previewLevelSpy = spy();
    const editorToolbar = shallow(
      <EditorToolbar {...props} previewLevelAction={previewLevelSpy} />,
    );
    const btnPreviewLevel = editorToolbar.find(Button).at(0);

    expect(previewLevelSpy.calledOnce).toBe(false);
    btnPreviewLevel.simulate('click');
    expect(previewLevelSpy.calledOnce).toBe(true);
  });

  it('Fires the "resetGrid" action when the reset grid button is clicked', () => {
    const resetGridSpy = spy();
    const editorToolbar = shallow(<EditorToolbar {...props} resetGridAction={resetGridSpy} />);
    const btnResetGrid = editorToolbar.find(Button).at(1);

    expect(resetGridSpy.calledOnce).toBe(false);
    btnResetGrid.simulate('click');
    expect(resetGridSpy.calledOnce).toBe(true);
  });
});

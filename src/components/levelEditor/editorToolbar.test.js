import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import Button from '../common/button';
import { EditorToolbar } from './editorToolbar';

configure({ adapter: new Adapter() });

describe('The editor toolbar', () => {
  let props;

  beforeEach(() => {
    props = {
      previewing: false,
      resetGridAction: () => {},
      previewLevelAction: () => {},
      editLevelAction: () => {},
    };
  });

  it('Renders without exploding', () => {
    const editorToolbar = shallow(<EditorToolbar {...props} />);

    expect(editorToolbar).toHaveLength(1);
  });

  it('Matches the current snapshot if not previewing', () => {
    const editorToolbar = shallow(<EditorToolbar {...props} />);

    expect(toJson(editorToolbar)).toMatchSnapshot();
  });

  it('Matches the current snapshot if previewing', () => {
    const editorToolbar = shallow(<EditorToolbar {...props} previewing />);

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

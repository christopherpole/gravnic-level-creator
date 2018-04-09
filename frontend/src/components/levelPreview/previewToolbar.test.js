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
    const btnrestartLevel = previewToolbar.find('#btn-restart');

    expect(restartLevelSpy.calledOnce).toBe(false);
    btnrestartLevel.simulate('click');
    expect(restartLevelSpy.calledOnce).toBe(true);
  });
});

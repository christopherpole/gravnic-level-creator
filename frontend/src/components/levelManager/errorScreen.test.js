import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { ErrorScreen, ReloadButton } from './errorScreen';

configure({ adapter: new Adapter() });

describe('The error screen', () => {
  let props;

  beforeAll(() => {
    props = {
      retrieveLevelsAction: () => {},
    };
  });

  it('Renders without exploding', () => {
    const errorScreen = shallow(<ErrorScreen {...props} />);

    expect(errorScreen).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const errorScreen = shallow(<ErrorScreen {...props} />);

    expect(toJson(errorScreen)).toMatchSnapshot();
  });

  it('Fires the retrieve levels action when clicking on the "reload" button', () => {
    const retrieveLevelsSpy = spy();
    const errorScreen = shallow(
      <ErrorScreen {...props} retrieveLevelsAction={retrieveLevelsSpy} />,
    );
    const btnReload = errorScreen.find(ReloadButton);
    btnReload.simulate('click');

    expect(retrieveLevelsSpy.calledOnce).toBe(true);
  });
});

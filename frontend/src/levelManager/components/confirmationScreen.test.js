import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { ConfirmationScreen, CancelButton, ConfirmButton } from './confirmationScreen';

configure({ adapter: new Adapter() });

describe('<ConfirmationScreen />', () => {
  let props;

  beforeAll(() => {
    props = {
      message: 'Are you sure?',
      cancelConfirmationAction: () => {},
      confirmConfirmationAction: () => {},
    };
  });

  it('Renders without exploding', () => {
    const confirmationScreen = shallow(<ConfirmationScreen {...props} />);

    expect(confirmationScreen).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const confirmationScreen = shallow(<ConfirmationScreen {...props} />);

    expect(toJson(confirmationScreen)).toMatchSnapshot();
  });

  it('Fires the cancel confirmation action when clicking on the "cancel" button', () => {
    const cancelConfirmationActionSpy = spy();
    const confirmationScreen = shallow(
      <ConfirmationScreen {...props} cancelConfirmationAction={cancelConfirmationActionSpy} />,
    );
    const btnCancel = confirmationScreen.find(CancelButton);
    btnCancel.simulate('click');

    expect(cancelConfirmationActionSpy.calledOnce).toBe(true);
  });

  it('Fires the cancel confirmation action when clicking on the "confirm" button', () => {
    const confirmConfirmationActionSpy = spy();
    const confirmationScreen = shallow(
      <ConfirmationScreen {...props} confirmConfirmationAction={confirmConfirmationActionSpy} />,
    );
    const btnConfirm = confirmationScreen.find(ConfirmButton);
    btnConfirm.simulate('click');

    expect(confirmConfirmationActionSpy.calledOnce).toBe(true);
  });
});

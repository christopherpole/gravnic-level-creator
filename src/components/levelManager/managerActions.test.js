import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { ManagerActions, Button } from './managerActions';

configure({ adapter: new Adapter() });

describe('The level manager actions', () => {
  let props;

  beforeEach(() => {
    props = {
      loadLevelAction: () => {},
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

  it('Fires the load level action when clicking on a level', () => {
    const loadLevelSpy = spy();
    const managerActions = shallow(<ManagerActions {...props} loadLevelAction={loadLevelSpy} />);
    const button = managerActions.find(Button).at(0);
    button.simulate('click');

    expect(loadLevelSpy.calledOnce).toBe(true);
  });
});

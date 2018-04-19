import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import LoadingScreen from './loadingScreen';

configure({ adapter: new Adapter() });

describe('<LoadingScreen />', () => {
  it('Renders without exploding', () => {
    const loadingScreen = shallow(<LoadingScreen />);

    expect(loadingScreen).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const loadingScreen = shallow(<LoadingScreen />);

    expect(toJson(loadingScreen)).toMatchSnapshot();
  });
});

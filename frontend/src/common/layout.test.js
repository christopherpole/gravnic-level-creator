import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Layout from './layout';

configure({ adapter: new Adapter() });

describe('<Layout />', () => {
  it('Renders without exploding', () => {
    const layout = shallow(<Layout />);

    expect(layout).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const layout = shallow(<Layout />);

    expect(toJson(layout)).toMatchSnapshot();
  });
});

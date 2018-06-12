import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { Layout } from './layout';

configure({ adapter: new Adapter() });

describe('<Layout />', () => {
  let props;

  beforeAll(() => {
    props = {
      previewing: false,
      solving: false,
    };
  });

  it('Renders without exploding', () => {
    const layout = shallow(<Layout {...props} />);

    expect(layout).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const layout = shallow(<Layout {...props} />);

    expect(toJson(layout)).toMatchSnapshot();
  });

  it('Matches the current snapshot when previewing', () => {
    const layout = shallow(<Layout {...props} previewing />);

    expect(toJson(layout)).toMatchSnapshot();
  });

  it('Matches the current snapshot when solving', () => {
    const layout = shallow(<Layout {...props} solving />);

    expect(toJson(layout)).toMatchSnapshot();
  });
});

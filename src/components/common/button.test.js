import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Button from './button';

configure({ adapter: new Adapter() });

describe('The generic button component', () => {
  let props;

  beforeEach(() => {
    props = {};
  });

  it('Renders without exploding', () => {
    const button = shallow(<Button {...props} />);

    expect(button).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const button = shallow(<Button {...props} />);

    expect(toJson(button)).toMatchSnapshot();
  });

  it('Matches the current snapshot for a disabled button', () => {
    const button = shallow(<Button {...props} disabled />);

    expect(toJson(button)).toMatchSnapshot();
  });
});

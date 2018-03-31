import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { StarsEditor } from './starsEditor';

configure({ adapter: new Adapter() });

const props = {};

describe('The tile selector', () => {
  it('Renders without exploding', () => {
    const starsEditor = shallow(<StarsEditor {...props} />);

    expect(starsEditor).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const starsEditor = shallow(<StarsEditor {...props} />);

    expect(toJson(starsEditor)).toMatchSnapshot();
  });
});

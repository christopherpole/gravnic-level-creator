import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import LevelEditor from './index';

configure({ adapter: new Adapter() });

describe('The level editor', () => {
  it('Renders without exploding', () => {
    const levelEditor = shallow(<LevelEditor />);

    expect(levelEditor).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const levelEditor = shallow(<LevelEditor />);

    expect(toJson(levelEditor)).toMatchSnapshot();
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { LevelManager } from './index';

configure({ adapter: new Adapter() });

describe('The level manager', () => {
  let props;

  beforeEach(() => {
    props = {
      loaded: true,
      error: true,
    };
  });

  it('Renders without exploding', () => {
    const levelManager = shallow(<LevelManager {...props} />);

    expect(levelManager).toHaveLength(1);
  });

  it('Matches the current snapshot when the levels are loading', () => {
    const levelManager = shallow(<LevelManager {...props} loaded={false} />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot when the levels have loaded without issue', () => {
    const levelManager = shallow(<LevelManager {...props} />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot when there was an error loading the levels', () => {
    const levelManager = shallow(<LevelManager {...props} error loaded={false} />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });
});

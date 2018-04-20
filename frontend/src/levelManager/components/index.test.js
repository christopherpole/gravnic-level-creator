import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import { LevelManager } from './index';

configure({ adapter: new Adapter() });

describe('<LevelManager />', () => {
  let props;

  beforeEach(() => {
    props = {
      loading: false,
      loaded: false,
      error: null,
      retrieveLevelsAction: () => {},
    };
  });

  it('Renders without exploding', () => {
    const levelManager = shallow(<LevelManager {...props} />);

    expect(levelManager).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const levelManager = shallow(<LevelManager {...props} />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot when the levels are loading', () => {
    const levelManager = shallow(<LevelManager {...props} loading />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot when the levels have loaded without issue', () => {
    const levelManager = shallow(<LevelManager {...props} loaded />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Matches the current snapshot when there was an error loading the levels', () => {
    const levelManager = shallow(<LevelManager {...props} error />);

    expect(toJson(levelManager)).toMatchSnapshot();
  });

  it('Fires the retrieve levels action after mounting', () => {
    const retrieveLevelsActionSpy = spy();
    shallow(<LevelManager {...props} retrieveLevelsAction={retrieveLevelsActionSpy} />);

    expect(retrieveLevelsActionSpy.calledOnce).toBe(true);
  });
});

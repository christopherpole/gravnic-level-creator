import React from 'react';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { LevelSolver } from './index';

configure({ adapter: new Adapter() });

describe('<LevelSolver />', () => {
  let props;

  beforeEach(() => {
    props = {
      editorTiles: [1, 2, 3],
    };
  });

  it('Renders without exploding', () => {
    const levelSolver = shallow(<LevelSolver {...props} />);

    expect(levelSolver).toHaveLength(1);
  });

  it('Matches the current snapshot', () => {
    const levelSolver = shallow(<LevelSolver {...props} />);

    expect(toJson(levelSolver)).toMatchSnapshot();
  });
});

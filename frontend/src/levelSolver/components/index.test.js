import React from 'react';
import { MOVE_DOWN } from 'gravnic-game';
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
      loading: false,
      error: false,
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

  it('Matches the current snapshot when loading', () => {
    const levelSolver = shallow(<LevelSolver loading {...props} />);

    expect(toJson(levelSolver)).toMatchSnapshot();
  });

  it('Matches the current snapshot with results', () => {
    const levelSolver = shallow(
      <LevelSolver result={{ solved: true, soution: [MOVE_DOWN], maxMoves: 10 }} {...props} />,
    );

    expect(toJson(levelSolver)).toMatchSnapshot();
  });

  it('Matches the current snapshot when an error has occured', () => {
    const levelSolver = shallow(<LevelSolver error {...props} />);

    expect(toJson(levelSolver)).toMatchSnapshot();
  });
});
